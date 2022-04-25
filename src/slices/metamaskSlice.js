import { createSlice } from '@reduxjs/toolkit'

const metamaskSlice = createSlice({
  name: 'metamask',
  initialState: {
    haveMetamask: false,
    isConnected: false,
    selectedAccount: undefined,
    accounts: [],
  },
  reducers: {
    checkMetamask: state => {
      if (typeof window.ethereum !== 'undefined') {
        state.haveMetamask = true;
        if(window.ethereum.selectedAddress != undefined){
          state.isConnected = true;
          state.selectedAccount = window.ethereum.selectedAddress;
        }
      }
    },
    metamaskConnected: state => {
      state.isConnected = true;
    },
    setSelectedAccount: state => {
      state.selectedAccount = window.ethereum.selectedAddress;
    },
    setAccounts: (state,action) => {
      state.accounts = action.payload
    },
  }
})

export const { checkMetamask } = metamaskSlice.actions


export const connectMetamask = () => {
  return async (dispatch, getState) => {
    try{
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      dispatch(metamaskSlice.actions.metamaskConnected())
      dispatch(metamaskSlice.actions.setSelectedAccount())
      dispatch(metamaskSlice.actions.setAccounts(accounts))
    }catch(e){
      if (e.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    }
  }
}



export const metamaskReducer = metamaskSlice.reducer;
