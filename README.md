# Solidity Coding Test

## Arbitrager
This exercise is designed to test a programmer's understanding of the Solidity language, ability to research and integrate other protocols, and their understanding of both traditional finance and DeFi concepts such as arbitrage, decentralized exchanges, and automated market makers.

### Main Task
Modify the [Arbitrager.sol](https://github.com/Tribe3-xyz/coding-test/blob/main/contracts/Arbitrager.sol) contract to handle arbitraging a WETH/token pair between two exchanges that use Uniswap V2 contracts. The function needs to check that the call was profitable after accounting for the transaction cost and revert otherwise. Furthermore, please update the [test](https://github.com/Tribe3-xyz/coding-test/blob/main/test/test.js) to show the contract's functionality. The tests should answer the following questions:
  1. What are the gas costs of calling the `arbitrage()` function?
  2. What price disparity is necessary for the arbitrager to be profitable?
  3. How much ETH needs to be sent to maximize profit?

### Additional Challenges
The following challenges are not required but they help us understand your coding skills and ability to handle architectural changes to the smart contracts.
  1. Modify the contract to support arbitrary token pairs.
  2. Modify the contract to support multiple exchange interfaces (e.g. Uniswap V3, Balancer, 1Inch, etc.)
  3. Make the contract ownable and then have the contract use it's own funds for trading. Provide profit-sharing incentives to users who call the `arbitrage()` function.
  4. Add support for gas station network and use profits to pay for the gas costs.
  5. Integrate flash loans to maximize profit.

## Setup
### Duplicate Repository
[Duplicate this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository) and set it to private. Give read access to [Tribe3](https://github.com/webmaster-tribe3)

### Install
```
yarn
```

### Compile
```
yarn compile
```

### Test
```
yarn test
```
