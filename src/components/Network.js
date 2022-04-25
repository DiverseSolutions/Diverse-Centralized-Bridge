import { useEffect } from 'react';
import useChainList from '../hooks/useChainlist';
import { useSelector,useDispatch } from 'react-redux';

import { setChainList,setCurrentNetwork } from '../slices/networkSlice';

export default function Network(){
  const { chainlist,isChainListError,isChainListLoading } = useChainList();
  const network = useSelector((state) => state.network)
  const dispatch = useDispatch()


  useEffect(() => {
    if(chainlist){
      let foundNetwork = chainlist.find((i) => i.chainId == window.ethereum.networkVersion)
      dispatch(setCurrentNetwork(foundNetwork))
      dispatch(setChainList(chainlist))
    }
  },[chainlist])

  if(isChainListLoading){
    return (
      <button className="btn btn-info">Fetching Chain Data...</button>
    )
  }

  if(network.currentNetwork && network.correctNetwork == network.currentNetwork.chainId){
    return (
      <button className="btn btn-primary">Mumbai Network</button>
    )
  }

  return (
    <button className="btn btn-warning">Wrong Network</button>
  )
}
