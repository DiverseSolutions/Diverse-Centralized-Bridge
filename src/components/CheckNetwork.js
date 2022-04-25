import {} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import Nav from './Nav';

export default function CheckNetwork({ children }){
  const network = useSelector((state) => state.network)
  const dispatch = useDispatch()

  if(network.currentNetwork && network.correctNetwork != network.currentNetwork.chainId){
    return (
      <>
        <Nav />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-6xl font-bold text-black">Detected { network.currentNetwork.name[0] } Network</h1>

          <div class="btn-group mt-5">
            <Link href={network.addCorrectNetworkMetamask}>
              <button class="btn btn-primary">Add { network.correctNetworkName } Network</button>
            </Link>
            <Link href={network.switchToCorrectNetwork}>
              <button class="btn btn-ghost">Switch To { network.correctNetworkName } Network</button>
            </Link>
          </div>
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
