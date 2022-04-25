import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { checkMetamask } from '../slices/metamaskSlice';

import Nav from './Nav';


export default function CheckMetamask({ children }){
  const metamask = useSelector((state) => state.metamask)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkMetamask())
  },[])

  if(metamask.haveMetamask == false){
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-6xl font-bold text-black">No Metamask Detected</h1>
      </div>
    )
  }

  if(metamask.isConnected == false){
    return (
      <>
        <Nav />
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-6xl font-bold text-black">Metamask Not Connected :(</h1>
        </div>
      </>
    )
  }


  return (
    <>
      { children }
    </>
  )
}
