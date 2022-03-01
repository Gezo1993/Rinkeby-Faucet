require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/c60b5f560e364ecb93b8a3047092f71e",
      accounts: [`0x${process.env.REACT_APP_PRIVATE_KEY}`],
    },
  },
};
