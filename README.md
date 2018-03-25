# Cryptozombies

#### Smart Contract/Solidity
* Truffle

## Prerequisites

* Install Node.js 8.x.x with NVM
* Install dependencies

## Development - Installation and Building

* Install Truffle, Ganache CLI ethereum client for local development, and Yarn

```bash
npm install -g truffle ganache-cli;
brew install yarn
```

* Install the node dependencies.

```bash
yarn install
```

* Run Ganache CLI.

```bash
ganache-cli \
  --port="8545" \
  --mnemonic "copy obey episode awake damp vacant protect hold wish primary travel shy" \
  --verbose \
  --networkId=1000 \
  --gasLimit=7984452 \
  --gasPrice=2000000000;
```

* Compile and migrate the contracts.

```bash
truffle compile;
truffle migrate --network development
```

* Debug

```
truffle console
for (var i in web3.eth.accounts) { console.log(web3.eth.getBalance(web3.eth.accounts[i])) }
```

## Testing

#### Smart Contracts

Truffle used to test Smart Contracts

```bash
truffle compile;
truffle migrate --network development;
truffle test
```
