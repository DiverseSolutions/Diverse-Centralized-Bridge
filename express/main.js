require('dotenv').config()

const MumbaiCoreABI = require('./abi/contracts/MumbaiCore.sol/MumbaiCore.json');
const FujiCoreABI = require('./abi/contracts/FujiCore.sol/FujiCore.json');
const RopstenCoreABI = require('./abi/contracts/RopstenCore.sol/RopstenCore.json');
const BSCTestNetCoreABI = require('./abi/contracts/BscTestCore.sol/BscTestCore.json');
const FantomTestNetCoreABI = require('./abi/contracts/FantomTestCore.sol/FantomTestCore.json');

const ERC20ABI = require('./abi/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json');

const { addresses } = require('./constants');

const express = require('express')
const cors = require('cors')

const { ethers } = require("ethers");

const app = express()
const port = 3500

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const mumbaiProvider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_TESTNET_URL);
const fujiProvider = new ethers.providers.JsonRpcProvider(process.env.FUJI_TESTNET_URL);
const ropstenProvider = new ethers.providers.JsonRpcProvider(process.env.ROPSTEN_TESTNET_URL);
const bscTestNetProvider = new ethers.providers.JsonRpcProvider(process.env.BSC_TESTNET_URL);
const fantomTestNetProvider = new ethers.providers.JsonRpcProvider(process.env.FANTOM_TESTNET_URL);

const mumbaiCoreContract = new ethers.Contract(addresses.MumbaiCore, MumbaiCoreABI, mumbaiProvider);
const fujiCoreContract = new ethers.Contract(addresses.FujiCore, FujiCoreABI, fujiProvider);
const ropstenCoreContract = new ethers.Contract(addresses.RopstenCore, RopstenCoreABI, ropstenProvider);
const bscTestNetCoreContract = new ethers.Contract(addresses.BSCTestNetCore, BSCTestNetCoreABI, bscTestNetProvider);
const fantomTestNetCoreContract = new ethers.Contract(addresses.FantomTestNetCore, FantomTestNetCoreABI, fantomTestNetProvider);

const mumbaiWallet = new ethers.Wallet(process.env.PRIVATE_KEY, mumbaiProvider);
const fujiWallet = new ethers.Wallet(process.env.PRIVATE_KEY, fujiProvider);
const ropstenWallet = new ethers.Wallet(process.env.PRIVATE_KEY, ropstenProvider);
const bscTestNetWallet = new ethers.Wallet(process.env.PRIVATE_KEY, bscTestNetProvider);
const fantomTestNetWallet = new ethers.Wallet(process.env.PRIVATE_KEY, fantomTestNetProvider);

const mumbaiCoreSigner = mumbaiCoreContract.connect(mumbaiWallet);
const fujiCoreSigner = fujiCoreContract.connect(fujiWallet);
const ropstenCoreSigner = ropstenCoreContract.connect(ropstenWallet);
const bscTestNetCoreSigner = bscTestNetCoreContract.connect(bscTestNetWallet);
const fantomTestNetCoreSigner = fantomTestNetCoreContract.connect(fantomTestNetWallet);

app.get('/health', async (req, res) => {
  res.json({
    "health" : "working"
  })
})

// Functionalities

app.post('/lock', async (req, res) => {
  const { network,tokenAddress,ownerAddress,amount } = req.body;

  if(network && tokenAddress && ownerAddress && amount){
    let contract = getContractSigner(network)
    let provider = getProvider(network)

    try{
      const tokenContract = new ethers.Contract(tokenAddress,ERC20ABI, provider);
      let tokenDecimals = await tokenContract.decimals();
      let amountBN = ethers.utils.parseUnits(amount.toString(),tokenDecimals)

      let transactionHash = await contract.lockToken(tokenAddress,ownerAddress,amountBN.toString())
      res.json({ transaction: transactionHash })
    }catch(e){
      res.json({
        error: e.reason ?? e.message,
      })
    }
  }else{
    res.json({
      error: 'missing network,tokenAddress,ownerAddress,amount body parameter',
    })
  }

})

app.post('/balance', async (req, res) => {
  const { network } = req.body;


  if(network){
    try{
      let wallet = getWallet(network)
      let balanceBN = await wallet.getBalance()
      res.json({
        network: network,
        balance: ethers.utils.formatUnits(balanceBN,"18")
      })
    }catch(e){
      console.log(e)
    }
  }else{
    res.json({
      error: 'missing network',
    })
  }

})

app.post('/unlock', async (req, res) => {
  res.json({
    error: 'missing network or name body',
  })
})

app.post('/mint', async (req, res) => {
  const { network,tokenAddress,mintAddress,amount } = req.body;

  if(network && tokenAddress && mintAddress && amount){
    let contract = getContractSigner(network)
    let provider = getProvider(network)

    try{
      const tokenContract = new ethers.Contract(tokenAddress,ERC20ABI, provider);
      let tokenDecimals = await tokenContract.decimals();
      let amountBN = ethers.utils.parseUnits(amount.toString(),tokenDecimals)

      let transactionHash = await contract.mintToken(tokenAddress,mintAddress,amountBN.toString())
      res.json({ transaction: transactionHash })
    }catch(e){
      res.json({
        error: e.reason ?? e.message,
      })
    }
  }else{
    res.json({
      error: 'missing network,tokenAddress,mintAddress,amount body parameter',
    })
  }
})

app.post('/burn', async (req, res) => {
  res.send("sheesh")
})

app.post('/createWrappedToken', async (req, res) => {
  const { network,name,symbol,decimals } = req.body;

  if(network && name && symbol && decimals){
    let contract = getContractSigner(network)

    try {
      let transactionResult = await contract.createWrappedToken(name,symbol,decimals)
      res.json({ transaction: transactionResult })
    } catch (e) {
      res.json({
        error: e.reason ?? e.message,
      })
    }

  }else{
    res.json({
      error: 'missing network/name/symbol/decimals body',
    })
  }

})

app.post('/getWrappedTokenAddress', async (req, res) => {
  const { network,name } = req.body;

  if(network && name){
    let contract = getContract(network)

    try {
      let _address = await contract.wrappedTokenNameMapping(name)
      res.json({ address: _address })
    } catch (e) {
      res.json({
        error: e.reason ?? e.message,
      })
    }

  }else{
    res.json({
      error: 'missing network/name body',
    })
  }

})

app.post('/checkWrappedToken', async (req, res) => {
  if(req.body.network !== undefined && req.body.name !== undefined){
    let contract = getContract(req.body.network)
    let result = await contract.hasWrappedTokenByName(req.body.name);
    res.json({
      'network': req.body.network,
      'hasWrappedVersion': result
    })
  }else{
    res.json({
      error: 'missing network or name body',
    })
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getProvider(name){
  switch(name){
    case 'mumbai':
      return mumbaiProvider;
    case 'fuji':
      return fujiProvider;
    case 'ropsten':
      return ropstenProvider;
    case 'bscTest':
      return bscTestNetProvider;
    case 'fantomTest':
      return fantomTestNetProvider;
    default:
      throw "Found No Provider";
  }
}

function getWallet(name){
  switch(name){
    case 'mumbai':
      return mumbaiWallet;
    case 'fuji':
      return fujiWallet;
    case 'ropsten':
      return ropstenWallet;
    case 'bscTest':
      return bscTestNetWallet;
    case 'fantomTest':
      return fantomTestNetWallet;
    default:
      throw "Found No Provider";
  }
}

function getContract(name){
  switch(name){
    case 'mumbai':
      return mumbaiCoreContract;
    case 'fuji':
      return fujiCoreContract;
    case 'ropsten':
      return ropstenCoreContract;
    case 'bscTest':
      return bscTestNetCoreContract;
    case 'fantomTest':
      return fantomTestNetCoreContract;
    default:
      throw "Found No Contract";
  }
}

function getContractSigner(name){
  switch(name){
    case 'mumbai':
      return mumbaiCoreSigner;
    case 'fuji':
      return fujiCoreSigner;
    case 'ropsten':
      return ropstenCoreSigner;
    case 'bscTest':
      return bscTestNetCoreSigner;
    case 'fantomTest':
      return fantomTestNetCoreSigner;
    default:
      throw "Found No Signer";
  }
}
