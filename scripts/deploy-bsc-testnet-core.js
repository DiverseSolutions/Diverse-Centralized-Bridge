const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const BscTestCore = await hre.ethers.getContractFactory("BscTestCore");
  const BscTestCoreContract = await BscTestCore.deploy();

  await BscTestCoreContract.deployed();

  console.log("BscTestCoreContract deployed to:", BscTestCoreContract.address);

  const content = {
    'BscTestCoreContract' : BscTestCoreContract.address
  }
  createAddressJson(path.join(__dirname, '/../src/address.json'),JSON.stringify(content))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function createAddressJson(path,content){
  try{
    fs.writeFileSync(path,content)
    console.log("Created Contract Address JSON")
  } catch (err) {
    console.error(err)
    return
  }
}
