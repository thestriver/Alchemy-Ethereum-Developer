const { ethers, upgrades } = require('hardhat');

const proxyAddress = '0x7aa1691951aBA75d4c2e4274b3C30580d7f41840';

async function main() {
  const VendingMachineV2 = await ethers.getContractFactory('VendingMachineV2');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  
  console.log("The current contract owner is: " + await upgraded.owner() );
  console.log('Implementation contract address: ' + implementationAddress);
}

main();