import { createSlice } from '@reduxjs/toolkit'

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    chainList: undefined,
    currentNetwork: undefined,
    correctNetwork: 80001,
    correctNetworkName: 'Mumbai',
    addCorrectNetworkMetamask: 'https://metamask.dsolutions.mn/add-chain?chainId=80001&chainName=Mumbai%20Testnet&rpcUrl=https://matic-mumbai.chainstacklabs.com&blockExplorerUrl=https://mumbai.polygonscan.com&iconUrl=https://cryptologos.cc/logos/polygon-matic-logo.png?v=022&currencyName=Matic&currencySymbol=MATIC&currencyDecimals=18',
    switchToCorrectNetwork: 'https://metamask.dsolutions.mn/switch-chain?chainId=80001',
  },
  reducers: {
    setChainList: (state,action) => {
      state.chainList = action.payload
    },
    setCurrentNetwork: (state,action) => {
      state.currentNetwork = action.payload
    },
  }
})

export const { setChainList,setCurrentNetwork } = networkSlice.actions


export const networkReducer = networkSlice.reducer;
