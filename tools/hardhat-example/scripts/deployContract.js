const hre = require('hardhat');
const hethers = require('@hashgraph/hethers');

module.exports = async () => {
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.RELAY_ENDPOINT);
  const wallet = new hre.ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY, provider);
  
  const payableAmount = hre.ethers.utils.parseEther("15.1")
  const gasLimit = 4000000;

  const contract = await hre.ethers.getContractFactory('TokenCreateContract', wallet);
  const tokenFacet = await contract.deploy({value: payableAmount, gasLimit});
  
  const contractAddress = (await tokenFacet.deployTransaction.wait()).contractAddress;

  console.log(`- Deployed contract (token faucet) to: ${contractAddress}`);

  return contractAddress;
};
