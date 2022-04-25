import { configureStore } from '@reduxjs/toolkit'
import { metamaskReducer } from './slices/metamaskSlice';
import { networkReducer } from './slices/networkSlice';

const store = configureStore({
  reducer: {
    metamask: metamaskReducer,
    network: networkReducer,
  }
})

export default store;
