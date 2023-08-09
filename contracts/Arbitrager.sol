//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "hardhat/console.sol";

import "./interfaces/IERC20.sol";
import "./interfaces/IWETH.sol";
import "./libraries/SafeTransferLib.sol";
import "./libraries/UniswapV2Library.sol";


contract Arbitrager {
    IWETH public immutable weth;

    constructor(address weth_) {
        weth = IWETH(weth_);
    }

    /*
     * @notice Arbitrages weth/token pair between two exchanges. Returning more
     *         Ether than was passed to the function or reverting.
     * @param token The address of the token that WETH is exchanged for.
     * @param routerA The UniswapV2Router02 for the exchange where WETH is swapped for the token.
     * @param routerB The UniswapV2Router02 for the exchange where the token is swapped for WETH.
     */
    function arbitrage(
        address token,
        address routerA,
        address routerB
    ) external payable {
        require(msg.value > 0, "No value");
        weth.deposit{ value: msg.value }();
        // TODO: Handle arbitrage functionality and ensure profitability
    }
}
