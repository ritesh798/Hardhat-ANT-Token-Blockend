
# ANT Token

ANT Token deployed on hardhat localhost , goerli,polygon mumbai


## Run Locally

Clone the project

```bash
  git clone https://github.com/ritesh798/Hardhat-ANT-Token-Blockend.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn add 
```

configure .env file with
```javascript
GOERLI_RPC_URL=your goerli  rpcurl
POLYGON_RPC_URL = your polygon rpc url
PRIVATE_KEY=your private key
ETHERSCAN_API_KEY=your etherscan API key
POLYGONSCAN_API_KEY=your polgonscan api key
UPDATE_FRONT_END=true
```
compile Contracts
```bash
yarn hardhat compile
```

deploy Contracts

```bash
  yarn hardhat deploy --network localhost
```
run scripts
 ```bash
 yarn hardhat run scripts/ApproveAnt.js --network localhost
 ```


## Running Tests

To run tests, run the following command

```bash
  yarn hardhat test 
```


## 🔗 Links
Hardhat Local Run link :https://www.loom.com/share/d2a5eda9a1b44495b22798d4e6d93caa
Front End Video link : https://www.loom.com/share/c25eda85ad904eb997ad247a5a411d1a

## Run it with Front End
 



Clone the Front End Proejct
```bash
git clone https://github.com/ritesh798/ANT-Token-FrontEnd.git
```

go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn add 
```
Run the Hardhat local host in BockEnd inside hardhat project
```bash
yarn hardhat  node
```
Run the Front  End Dev Server
```bash
yarn  run dev
```

Interact with the website and send Transactions




