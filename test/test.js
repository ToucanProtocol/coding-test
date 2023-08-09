const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { constants, getSigners, Contract } = ethers;
const { WeiPerEther } = constants;

const ERC20 = require("@uniswap/v2-periphery/build/ERC20.json")
const WETH9 = require("@uniswap/v2-periphery/build/WETH9.json")
const UniswapV2Router = require("@uniswap/v2-periphery/build/UniswapV2Router01.json")
const UniswapV2Factory = require("@uniswap/v2-core/build/UniswapV2Factory.json")
const UniswapV2Pair = require("@uniswap/v2-core/build/UniswapV2Pair.json")

describe("Arbitrager", function() {
  let owner,
      trader,
      weth,
      token,
      arbitrager,
      uniswapRouter,
      sushiRouter;

  async function deployWETH(depositAmount) {
    weth = await waffle.deployContract(owner, WETH9)
    await weth.deposit({ value: depositAmount })
  }

  async function deployToken(mintAmount) {
    token = await waffle.deployContract(owner, ERC20, [mintAmount])
  }

  async function deployDEX(liquidityAmount, wethTokenRatio = 1) {
    const factory = await waffle.deployContract(owner, UniswapV2Factory, [owner.address])
    await factory.deployed()
    const router = await waffle.deployContract(owner, UniswapV2Router, [factory.address, weth.address])
    await router.deployed()
    await factory.createPair(weth.address, token.address)
    const pairAddress = await factory.getPair(weth.address, token.address)
    const pair = new Contract(pairAddress, JSON.stringify(UniswapV2Pair.abi), owner)

    // Add liquidity
    await weth.connect(owner).transfer(pairAddress, liquidityAmount)
    await token.connect(owner).transfer(pairAddress, liquidityAmount.mul(wethTokenRatio))
    await pair.connect(owner).mint(owner.address)
    return { factory, router }
  }

  beforeEach("Deploy contracts", async function() {
    const accounts = await getSigners();
    owner = accounts[0];
    trader = accounts[1];
    // Deploy tokens
    await deployWETH(WeiPerEther.mul(300));
    await deployToken(WeiPerEther.mul(30000000));
    // Deploy exchanges
    const uniswap = await deployDEX(WeiPerEther.mul(100), 1900);
    const sushi = await deployDEX(WeiPerEther.mul(100), 1800);
    uniswapRouter = uniswap.router;
    sushiRouter = sushi.router;
    // Deploy arbitrager
    const Arbitrager = await ethers.getContractFactory("Arbitrager");
    arbitrager = await Arbitrager.deploy(weth.address);
    await arbitrager.deployed();
  });

  it("should fail if no ETH is provided", async function() {
    await expect(
      arbitrager.connect(trader).arbitrage(
      token.address,
      uniswapRouter.address, 
      sushiRouter.address
    )).to.be.revertedWith("No value");
  });

  it("should perform profitable arbitrage", async function() {
    // Pre-conditions
    const capitalAtRisk = ethers.utils.parseUnits("1", "ether");
    const traderBalanceBefore = await ethers.provider.getBalance(trader.address);

    // Perform arbitrage
    await arbitrager.connect(trader).arbitrage(
      token.address,
      uniswapRouter.address, 
      sushiRouter.address,
      { value: capitalAtRisk }
    );

    // Post-conditions
    const traderBalanceAfter = await ethers.provider.getBalance(trader.address);
    expect(traderBalanceAfter).to.be.gt(traderBalanceBefore);
  });

  it("should fail to perform unprofitable arbitrage", async function() {
    // Pre-conditions; arbitrage is captured already
    const capitalAtRisk = ethers.utils.parseUnits("1", "ether");
    await arbitrager.connect(owner).arbitrage(
      token.address,
      uniswapRouter.address, 
      sushiRouter.address,
      { value: capitalAtRisk }
    );

    // Follow-up arbitrage should fail
    await expect(
      arbitrager.connect(trader).arbitrage(
      token.address,
      uniswapRouter.address, 
      sushiRouter.address,
      { value: capitalAtRisk }
    )).to.be.revertedWith("Not profitable");
  });
});
