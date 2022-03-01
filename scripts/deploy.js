const hre = require("hardhat");

const main = async () => {
  // We get the contract to deploy
  const Faucet = await hre.ethers.getContractFactory("faucet");
  const faucet = await Faucet.deploy();

  await faucet.deployed();

  console.log(`Faucet deployed to: ${faucet.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
