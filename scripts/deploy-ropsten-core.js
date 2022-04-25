const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const RopstenCore = await hre.ethers.getContractFactory("RopstenCore");
  const RopstenCoreContract = await RopstenCore.deploy();

  await RopstenCoreContract.deployed();

  console.log("RopstenCoreContract deployed to:", RopstenCoreContract.address);

  const content = {
    'RopstenCoreContract' : RopstenCoreContract.address
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
