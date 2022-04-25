const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const FantomTestCore = await hre.ethers.getContractFactory("FantomTestCore");
  const FantomTestCoreContract = await FantomTestCore.deploy();

  await FantomTestCoreContract.deployed();

  console.log("FantomTestCoreContract deployed to:", FantomTestCoreContract.address);

  const content = {
    'FantomTestCoreContract' : FantomTestCoreContract.address
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
