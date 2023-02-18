const hre = require('hardhat');
const hethers = require('@hashgraph/hethers');

module.exports = async (contractAddress) => {
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.RELAY_ENDPOINT);
  const wallet = new hre.ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY, provider);

  const payableAmount = hre.ethers.utils.parseEther("5.1")
  
  const tokenSender = await hre.ethers.getContractAt('TokenCreateContract', contractAddress, wallet);
  const tokenSendTx = await tokenSender.claimFT( {value: payableAmount } );

  console.log(`\n- Transferred tokens`);


};
