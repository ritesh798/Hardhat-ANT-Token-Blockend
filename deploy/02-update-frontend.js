const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONT_END_ADDRESSES_FILE =
  "../frontenderc20/constants/contractAddresses.json";

const FRONT_END_ABI_FILE = "../frontenderc20/constants/abi.json";
const FRONTEND_OWNER__FILE = "../frontenderc20/constants/owner.json";

module.exports = async function ({ getNamedAccounts }) {
  const { deployer } = await getNamedAccounts();

  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating front end");
    updateContractAddresses();
    updateAbi();
    updateOwnerAddress(deployer);
  }
};

async function updateAbi() {
  const antToken = await ethers.getContract("AntToken");
  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    antToken.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const antToken = await ethers.getContract("AntToken");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
  );
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(antToken.address)) {
      currentAddresses[chainId].push(antToken.address);
    }
  } else {
    currentAddresses[chainId] = [antToken.address];
  }
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

// async function updateAbi() {
//   const nftMarketplace = await ethers.getContract("NftMarketplace");
//   fs.writeFileSync(
//     `${frontEndAbiLocation}NftMarketplace.json`,
//     nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
//   );
//   const basicNft = await ethers.getContract("BasicNft");
//   fs.writeFileSync(
//     `${frontEndAbiLocation}BasicNft.json`,
//     basicNft.interface.format(ethers.utils.FormatTypes.json)
//   );
// }

// async function updateContractAddresses() {
//   const nftMarketplace = await ethers.getContract("NftMarketplace");
//   const chainId = network.config.chainId.toString();
//   const contractAddresses = JSON.parse(
//     fs.readFileSync(frontEndContractFile, "utf8")
//   );
//   if (chainId in contractAddresses) {
//     if (
//       !contractAddresses[chainId]["NftMarketplace"].includes(
//         nftMarketplace.address
//       )
//     ) {
//       contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address);
//     }
//   } else {
//     contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] };
//   }
//   fs.writeFileSync(frontEndContractFile, JSON.stringify(contractAddresses));
// }

async function updateOwnerAddress(deployer) {
  const antToken = await ethers.getContract("AntToken", deployer);
  const owner = await antToken.owner();
  const currentOwner = JSON.parse(
    fs.readFileSync(FRONTEND_OWNER__FILE, "utf8")
  );
  currentOwner["owner"] = owner;
  fs.writeFileSync(FRONTEND_OWNER__FILE, JSON.stringify(currentOwner));
}
module.exports.tags = ["all", "front-end"];
