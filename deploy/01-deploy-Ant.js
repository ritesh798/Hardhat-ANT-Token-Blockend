const { network } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const antToken = await deploy("AntToken", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,

    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`antToken deployed at ${antToken.address}`);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(antToken.address, [INITIAL_SUPPLY]);
  }
};

module.exports.tags = ["all", "token"];
