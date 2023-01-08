const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy();

    const [owner, signer2] = await ethers.getSigners();

    let withdrawAmount = ethers.utils.parseUnits('1', 'ether');

    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, withdrawAmount, signer2 };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should send only 0.1 eth to users', async function () {
    const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it('should only withdraw all to owner address', async function () {
    const { faucet, signer2 } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(signer2).withdrawAll()).to.be.reverted
  });

});