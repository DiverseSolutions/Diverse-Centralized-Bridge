const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const MumbaiCore = await hre.ethers.getContractFactory("MumbaiCore");
  const MumbaiCoreContract = await MumbaiCore.deploy();

  await MumbaiCoreContract.deployed();

  console.log("MumbaiCoreContract deployed to:", MumbaiCoreContract.address);

  const content = {
    'MumbaiCoreContract' : MumbaiCoreContract.address
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
