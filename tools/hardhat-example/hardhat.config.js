require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

task('deploy-contract', async () => {
  const deployContract = require('./scripts/deployContract');
  return deployContract();
});

task('transfer-tokens', async (taskArgs) => {
  const transferTokens = require('./scripts/transferTokens');
  return transferTokens(taskArgs.contractAddress);
});

module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'relay',
  networks: {
    relay: {
      url: process.env.RELAY_ENDPOINT,
      gas: 4000000
    }
  }
};
