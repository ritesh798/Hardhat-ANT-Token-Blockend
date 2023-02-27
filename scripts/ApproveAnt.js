const { getNamedAccounts, ethers } = require("hardhat");

async function approve() {
  const { deployer, player, player2 } = await getNamedAccounts();

  const antToken = await ethers.getContract("AntToken", deployer);
  const playerToken = await ethers.getContract("AntToken", player);
  const player2Token = await ethers.getContract("AntToken", player2);

  const owner = await antToken.owner();
  console.log(`Owner is ${owner}`);
  console.log("-----------------------------------------------------");
  await antToken.approve(player, ethers.utils.parseUnits("20"));

  const allowance = await antToken.allowance(deployer, player);
  console.log(
    `Deployer checking allowance of  player ALLOWANCE: ${ethers.utils.formatEther(
      allowance
    )}ANT`
  );
  console.log("-----------------------------------------------------");
  const playerAllowance = await playerToken.allowance(deployer, player);
  console.log(
    `Player checking Allowance of itself ALLOWANCE:  ${ethers.utils.formatEther(
      playerAllowance
    )}ANT`
  );
  console.log("-----------------------------------------------------");

  await antToken.increaseAllowance(player, ethers.utils.parseUnits("20"));
  const increasedAllowance = await antToken.allowance(deployer, player);
  console.log(
    `Incresed allowance of a player is ALLOWANCE:${ethers.utils.formatEther(
      increasedAllowance
    )}ANT`
  );
  console.log("-----------------------------------------------------");

  await playerToken.transferFrom(
    deployer,
    player,
    ethers.utils.parseUnits("20")
  );

  await playerToken.approve(player2, ethers.utils.parseUnits("5"));
  const player2Allowwance = await playerToken.allowance(player, player2);
  console.log(
    `allowance of player2 allowed by player ALLOWANCE:${ethers.utils.formatEther(
      player2Allowwance
    )}ANT`
  );
  console.log("-----------------------------------------------------");
  await playerToken.increaseAllowance(player2, ethers.utils.parseUnits("5"));
  const increasedPlayer2Allowance = await playerToken.allowance(
    player,
    player2
  );
  await player2Token.transferFrom(
    player,
    player2,
    ethers.utils.parseUnits("10")
  );
  const parsed = parseInt(increasedPlayer2Allowance).toString();

  console.log(
    `increased allowance of player2 allowed by player ${ethers.utils.formatEther(
      increasedPlayer2Allowance
    )}ANT`
  );
  console.log("-----------------------------------------------------");
}

approve()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
