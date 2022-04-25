const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BridgeCore - Create Wrapped Token", function () {

  it("Creating Wrapped Token - Test BSC DummyTokenA to Mumbai", async function () {
    const [owner] = await ethers.getSigners();

    const BscTestCore = await ethers.getContractFactory("BscTestCore");
    const MumbaiCore = await ethers.getContractFactory("MumbaiCore");
    const DummyToken = await ethers.getContractFactory("DummyToken");

    const DummyTokenAContract = await DummyToken.deploy("DummyTokenA","DT-A",100);
    await DummyTokenAContract.deployed();

    const BscTestCoreContract = await BscTestCore.deploy();
    const MumbaiCoreContract = await MumbaiCore.deploy();

    await BscTestCoreContract.deployed();
    await MumbaiCoreContract.deployed();

    const tokenAddress = DummyTokenAContract.address;
    const amount = ethers.utils.parseUnits('50',"ether");

    expect(await MumbaiCoreContract.hasWrappedTokenByName("WrappedDummyTokenA")).to.equal(false);

    // Lock Amount
    await (await DummyTokenAContract.approve(BscTestCoreContract.address,amount)).wait();
    await BscTestCoreContract.lockToken(tokenAddress,owner.address,amount);

    expect(await DummyTokenAContract.balanceOf(BscTestCoreContract.address)).to.equal(amount);
    expect(await DummyTokenAContract.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits('50',"ether"));

    // Creating Wrapped Token
    await ((await MumbaiCoreContract.createWrappedToken("WrappedDummyTokenA","WDT-A",18)).wait())
    expect(await MumbaiCoreContract.hasWrappedTokenByName("WrappedDummyTokenA")).to.equal(true);


    let wrappedTokenAddress = await MumbaiCoreContract.wrappedTokenNameMapping('WrappedDummyTokenA')
    const wrappedTokenContract = await ethers.getContractAt('IERC20',wrappedTokenAddress)

    // Minting Wrapped Token
    await ((await MumbaiCoreContract.mintToken(wrappedTokenAddress,owner.address,amount)).wait())
    expect(await wrappedTokenContract.balanceOf(owner.address)).to.equal(amount);

  });

});

