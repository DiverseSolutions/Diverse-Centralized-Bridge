const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const FujiCore = await hre.ethers.getContractFactory("FujiCore");
  const FujiCoreContract = await FujiCore.deploy();

  await FujiCoreContract.deployed();

  console.log("FujiCoreContract deployed to:", FujiCoreContract.address);

  const content = {
    'FujiCoreContract' : FujiCoreContract.address
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
