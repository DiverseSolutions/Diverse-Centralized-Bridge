import { useEffect,useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { useSelector,useDispatch } from 'react-redux';


import styles from '../styles/Home.module.css'
import BscMumbaiBridge from '../components/BscMumbaiBridge';

export default function Home() {
  const network = useSelector((state) => state.network)

  const [supportedNetworks,setSupportedNetworks] = useState([]);

  useEffect(() => {
    if(network.chainList){
      let mumbai = network.chainList.find((i) => i.chainId == 80001)
      let fuji = network.chainList.find((i) => i.chainId == 43113)
      let bscTest = network.chainList.find((i) => i.chainId == 97)
      let ropsten = network.chainList.find((i) => i.chainId == 3)
      let fantomTest = network.chainList.find((i) => i.chainId == 4002)

      setSupportedNetworks([mumbai,fuji,ropsten,bscTest,fantomTest])
    }
  },[network.chainList])

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col text-center">
          <div className="">
            <h1 className="text-6xl font-bold">Supported Chains</h1>
            <div className="w-full flex justify-center mt-7">
              { supportedNetworks.length > 0 && (
                <>
                  <div className="w-9/12 flex justify-around">
                    { supportedNetworks.map((i) => (
                      <button className="btn btn-ghost">
                        <img src={i.logos[0]} alt="logo" className="w-11 h-11" />
                      </button>
                    )) }
                  </div>
                </>

              ) }
            </div>
          </div>
          <div className="mt-8 w-full">
            <BscMumbaiBridge />
          </div>
        </div>
      </div>
    </div>
  )
}
