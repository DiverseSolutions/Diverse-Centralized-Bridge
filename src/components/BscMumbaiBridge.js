import { ethers } from "ethers";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState,useEffect } from 'react'

import { useSelector,useDispatch } from 'react-redux';

import ERC20ABI from '../abi/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json';
import CoreNetworkABI from '../abi/contracts/CoreNetwork.sol/CoreNetwork.json';

const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL

export default function BscMumbaiBridge(){
  const metamask = useSelector((state) => state.metamask)
  const dispatch = useDispatch()

  const [addressInput,setAddressInput] = useState('')
  const [amountInput,setAmountInput] = useState('')

  const [approveDisabled,setApproveDisabled] = useState(true)
  const [bridgeDisabled,setBridgeDisabled] = useState(true)
  const [wrappedDisabled,setWrappedDisabled] = useState(true)

  const [showApprove,setShowApprove] = useState(false)
  const [showBridge,setShowBridge] = useState(false)
  const [showCreateWrapped,setShowCreateWrapped] = useState(false)
  const [showValidateAddress,setShowValidateAddress] = useState(false)

  const [loadingApprove,setLoadingApprove] = useState(false)
  const [loadingCreateWrapped,setLoadingCreateWrapped] = useState(false)
  const [loadingBridge,setLoadingBridge] = useState(false)

  const [provider,setProvider] = useState(null)

  const [fujiProvider,setFujiProvider] = useState(null)
  const [ropstenProvider,setRopstenProvider] = useState(null)
  const [fantomTestProvider,setFantomTestProvider] = useState(null)
  const [bscTestProvider,setBscTestProvider] = useState(null)


  const [signer,setSigner] = useState(null)

  useEffect(() => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum)
    const _signer = _provider.getSigner()

    setProvider(_provider)

    setFujiProvider(new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_FUJI_TESTNET_URL))
    setFujiProvider(new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_FUJI_TESTNET_URL))
    setRopstenProvider(new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ROPSTEN_TESTNET_URL))
    setFantomTestProvider(new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_FANTOM_TESTNET_URL))
    setBscTestProvider(new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_BSC_TESTNET_URL))

    setSigner(_signer)
  },[])

  function handleAddressOnChange(e){
    let value = e.target.value

    if(value.length > 0){
      try{
        let address = ethers.utils.getAddress(value)
        setShowValidateAddress(true)
      }catch(e){}
    }else{
      setShowValidateAddress(false)
      setShowApprove(false)
      setShowCreateWrapped(false)
      setShowBridge(false)

      setApproveDisabled(true)
      setBridgeDisabled(true)
      setWrappedDisabled(true)
    }

    setAddressInput(value)
  }

  async function handleApprove(e){
    try{
      let address = ethers.utils.getAddress(addressInput)
      let _amount = ethers.BigNumber.from(amountInput)

      const tokenContract = new ethers.Contract(address, ERC20ABI, provider);
      const tokenContractSigner = tokenContract.connect(signer)

      let tokenName = await tokenContract.name()
      let tokenDecimals = await tokenContract.decimals()

      setLoadingApprove(true)

      let _amountWei = ethers.utils.parseUnits(_amount.toString(),tokenDecimals)
      await (await tokenContractSigner.approve('0x149B64067EB836f982dC39c34F89a6A49418CfC5',_amountWei)).wait()

      let result = await axios.post(`${EXPRESS_URL}/checkWrappedToken`,{
        	"network": "fantomTest",
	        "name": 'Wrapped' + ' ' + tokenName
      })

      if(result.data.hasWrappedVersion == false){
        setShowCreateWrapped(true)
        setWrappedDisabled(false)
      }else{
        setShowBridge(true)
        setBridgeDisabled(false)
      }

      setApproveDisabled(true)
    }catch(e){
      console.log(e)
    }

    setLoadingApprove(false)
  }

  async function handleCreateWrapped(e){
    try {
      let address = ethers.utils.getAddress(addressInput)
      let _amount = ethers.BigNumber.from(amountInput)

      const tokenContract = new ethers.Contract(address, ERC20ABI, provider);
      const tokenContractSigner = tokenContract.connect(signer)

      const tokenName = await tokenContract.name()
      const tokenSymbol = await tokenContract.symbol()
      const tokenDecimals = await tokenContract.decimals()

      const wrappedTokenName = 'Wrapped' + ' ' + tokenName

      setLoadingCreateWrapped(true);
      let createWrappedTokenResult = await axios.post(`${EXPRESS_URL}/createWrappedToken`,{
        	"network": "fantomTest",
	        "name": wrappedTokenName,
          "symbol": 'W' + tokenSymbol,
          "decimals": tokenDecimals,
      })

      Swal.fire({
        icon: 'success',
        title: `Hash ${createWrappedTokenResult.data.transaction.hash}`,
      })

      let finished = await fantomTestProvider.getTransaction(createWrappedTokenResult.data.transaction.hash)

      if(finished == null){
        await fantomTestProvider.waitForTransaction(createWrappedTokenResult.data.transaction.hash)
      }

      let findWrappedTokenResult = await axios.post(`${EXPRESS_URL}/getWrappedTokenAddress`,{
        	"network": "fantomTest",
	        "name": wrappedTokenName,
      })

      Swal.fire({
        icon: 'success',
        title: `Wrapped Token Address ${findWrappedTokenResult.data.address}`,
      })

      setWrappedDisabled(true)
      setShowBridge(true)

      setShowCreateWrapped(false)
      setBridgeDisabled(false)
    }catch(e){ console.log(e) }

    setLoadingCreateWrapped(false);
  }

  async function handleBridge(e){
    try {
      let address = ethers.utils.getAddress(addressInput)
      let _amount = ethers.BigNumber.from(amountInput)

      const tokenContract = new ethers.Contract(address, ERC20ABI, provider);
      const tokenContractSigner = tokenContract.connect(signer)

      const tokenName = await tokenContract.name()
      const tokenSymbol = await tokenContract.symbol()
      const tokenDecimals = await tokenContract.decimals()

      setLoadingBridge(true)
      let lockTokenResult = await axios.post(`${EXPRESS_URL}/lock`,{
        	"network": "mumbai",
          "tokenAddress" : address,
          "ownerAddress" : window.ethereum.selectedAddress,
          "amount" : _amount.toNumber()
      })

      if(lockTokenResult.status != 200){
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong While Locking Token',
        })
      }

      Swal.fire({ 
        icon: 'success', 
        title: 'Successfully Locked Token', 
        showConfirmButton: false,
        timer: 2000,
      })

      const wrappedTokenName = 'Wrapped' + ' ' + tokenName

      let findWrappedTokenResult = await axios.post(`${EXPRESS_URL}/getWrappedTokenAddress`,{
        	"network": "fantomTest",
	        "name": wrappedTokenName,
      })

      let tokenAddressOnTargetChain = findWrappedTokenResult.data.address

      let mintTokenResult = await axios.post(`${EXPRESS_URL}/mint`,{
        	"network": "fantomTest",
          "tokenAddress" : tokenAddressOnTargetChain,
          "mintAddress" : window.ethereum.selectedAddress,
          "amount" : _amount.toNumber()
      })

      console.log(mintTokenResult.data.transaction.hash)

      let finished = await fantomTestProvider.getTransaction(mintTokenResult.data.transaction.hash)

      if(finished == null){
        await fantomTestProvider.waitForTransaction(mintTokenResult.data.transaction.hash)
      }

      Swal.fire({ 
        icon: 'success', 
        title: 'Successfully Minted Wrapped Token On Target Network',
        showConfirmButton: false,
        timer: 2000,
      })

    }catch(e){
     console.log(e)
    }

    setLoadingBridge(false)
  }

  function handleValidateAddress(e){
    if(amountInput.length == 0){
      Swal.fire({
        icon: 'error',
        title: 'Amount Input Empty',
        showConfirmButton: false,
        timer: 1000,
      })
      return;
    }

    try{
      let address = ethers.utils.getAddress(addressInput)
      const tokenContract = new ethers.Contract(address, ERC20ABI, provider);
      setShowValidateAddress(false)

      setShowApprove(true)
      setApproveDisabled(false)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="mockup-code">
      <div className="w-full flex flex-col items-center">
        <code className="text-2xl">Bridge Token</code>
        <code className="mt-1 text-sm">Mumbai -> Fantom TestNet Flow Test</code>

        <div className="w-10/12 my-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Contract Address</span>
              <span className="label-text-alt text-white"></span>
            </label>
            <input type="text" placeholder="Contract Address" 
              value={addressInput}
              onChange={handleAddressOnChange}
              className="input input-bordered w-full"/>
            <label className="label">
              <span className="label-text"></span>
              <span className="label-text-alt text-white"></span>
            </label>
          </div>

          <div className="my-2"></div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Amount</span>
              <span className="label-text-alt text-white"></span>
            </label>
            <input type="text" placeholder="Token Amount" 
              value={amountInput}
              onChange={(e) => {
                setAmountInput(e.target.value)
              }}
              className="input input-bordered w-full"/>
            <label className="label">
              <span className="label-text"></span>
              <span className="label-text-alt text-white"></span>
            </label>
          </div>
        </div>

        { showValidateAddress && (
          <button onClick={handleValidateAddress} className={`btn w-10/12 btn-warning mb-2`}>Validate Contract Address</button>
        ) }

        <div className="btn-group w-10/12 item-center mb-2">
          { showApprove && ( <button onClick={handleApprove} 
              className={`btn w-4/12 btn-info ${loadingApprove && 'loading'} ${approveDisabled && 'text-white btn-disabled'}`}>Approve</button> ) }

          { showBridge && ( <button 
            onClick={handleBridge}
            className={`btn w-8/12 btn-primary ${loadingBridge && 'loading'} ${bridgeDisabled && 'text-white btn-disabled'}`}>Bridge</button> ) }
        </div>
        { showCreateWrapped && (
          <button 
            onClick={handleCreateWrapped}
            className={`btn w-10/12 btn-warning mb-2 ${loadingCreateWrapped && 'loading'}`}>Create Wrapped Token</button>
        ) }
      </div>
    </div>
  )
}
