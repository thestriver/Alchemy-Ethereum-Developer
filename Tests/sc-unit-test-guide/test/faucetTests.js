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

  it('should check that only owner can call destroyFaucet() address', async function () {
    const { faucet, signer2 } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(signer2).destroyFaucet()).to.be.reverted
  });

  it('should call destroyFaucet() successfully when owner calls it', async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    let provider = ethers.getDefaultProvider();
    await faucet.destroyFaucet();

    expect(await provider.getCode(faucet.address)).to.equal("0x");
  });
  
  // it("should return funds to the owner successfully when selfdestruct is called", async function () {
  //   const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
  //   let provider = ethers.getDefaultProvider();
  //   const balanceBefore = await faucet.provider.getBalance(owner.address); //original balance
  //   const balanceContractBefore = await faucet.provider.getBalance(
  //     faucet.address
  //   );

  //   const tx = await faucet.destroyFaucet();
  //   const txReceipt = await tx.wait(1);
  //   const { gasUsed, effectiveGasPrice } = txReceipt;
  //   const gasCost = gasUsed.mul(effectiveGasPrice);

  //   const balanceContractAfter = await faucet.provider.getBalance(
  //     faucet.address
  //   );

  //   const balanceAfter = await faucet.provider.getBalance(owner.address);

  //   expect(balanceAfter.toString() > balanceBefore.toString()).to.be.true;

  //   expect(balanceContractAfter.toString()).to.equal("0");

  //   expect(balanceContractBefore.add(balanceBefore).toString()).to.equal(
  //     balanceAfter.add(gasCost).toString()
  //   );

        // const ownerBalance = await ethers.provider.getBalance(owner);
        // expect(ownerBalance).to.be.greaterThan(0);
  // });


});