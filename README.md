# Solidity Coding Test

## Arbitrager
This exercise is designed to test a programmer's understanding of the Solidity language, ability to research and integrate other protocols, and their understanding of both traditional finance and DeFi concepts such as arbitrage, decentralized exchanges, and automated market makers.

### Main Task
Modify the [Arbitrager.sol](https://github.com/ToucanProtocol/coding-test/blob/main/contracts/Arbitrager.sol) contract to handle arbitraging a WETH/token pair between two exchanges that use Uniswap V2 contracts. The function needs to check that the call was profitable and return the ETH back to the sender or revert otherwise.

### Additional Challenges
The following challenges are not required but they help us understand your coding skills and ability to handle architectural changes to the smart contracts.
  1. Modify the contract to support arbitrary token pairs.
  2. Make the contract ownable and then have the contract use its own funds for trading. Provide profit-sharing incentives to users who call the `arbitrage()` function.
  3. Add support for gas station network and use profits to pay for the gas costs.
  4. Integrate flash loans to improve the capital efficiency of the contract.

## Setup
### Duplicate Repository
* [Import](https://github.com/new/import) this repository as a private repo. Note that this is different from forking.
* Go to `Settings` -> `Actions` -> `General` and select `Allow all actions and reusable workflows`. This will allow the Github workflow that is part of the repo to run in your pull request so you can get feedback about your contract from CI.
* Give read access to [Adam](https://github.com/aspiers) and [Michalis](https://github.com/0xmichalis).
* Push your solution in a new branch and open a pull request in your repo to your `main` branch.

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
