require('dotenv').config();
const hre = require('hardhat');
const { expect } = require('chai');

describe('RPC', function() {
  let contractAddress;

  it('should be able to deploy a contract', async function() {
    contractAddress = await hre.run('deploy-contract');
    expect(contractAddress).to.not.be.null;
  });

  it('should be able to make a contract call to claim fungible tokens', async function() {
    await hre.run('transfer-tokens', { contractAddress });
  })

});
