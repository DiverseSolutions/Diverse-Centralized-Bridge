import { useEffect,useState } from 'react';
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useSelector,useDispatch } from 'react-redux';

import styles from '../styles/Home.module.css'
import BscMumbaiBridge from '../components/BscMumbaiBridge';

const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL

export default function Home() {
  const network = useSelector((state) => state.network)
  const [supportedNetworks,setSupportedNetworks] = useState([]);
  const [mumbaiBalance,setMumbaiBalance] = useState(0)
  const [fujiBalance,setFujiBalance] = useState(0)
  const [ropstenBalance,setRopstenBalance] = useState(0)
  const [bscTestBalance,setBscTestBalance] = useState(0)
  const [fantomTestBalance,setFantomTestBalance] = useState(0)

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


  useEffect(() => {
    axios.post(`${EXPRESS_URL}/balance`,{ network: 'mumbai' }).then((r) => { setMumbaiBalance(r.data.balance) }).catch((e) => { console.log(e) })
    axios.post(`${EXPRESS_URL}/balance`,{ network: 'fuji' }).then((r) => { setFujiBalance(r.data.balance) }).catch((e) => { console.log(e) })
    axios.post(`${EXPRESS_URL}/balance`,{ network: 'ropsten' }).then((r) => { setRopstenBalance(r.data.balance) }).catch((e) => { console.log(e) })
    axios.post(`${EXPRESS_URL}/balance`,{ network: 'bscTest' }).then((r) => { setBscTestBalance(r.data.balance) }).catch((e) => { console.log(e) })
    axios.post(`${EXPRESS_URL}/balance`,{ network: 'fantomTest' }).then((r) => { setFantomTestBalance(r.data.balance) }).catch((e) => { console.log(e) })
  },[])


  return (
    <div className="mx-4">
      <div className="w-full min-h-screen">
        <div className="h-full flex justify-around w-full">

          <div className="flex w-4/12 flex-col justify-center items-center">
            <div className="stats shadow drop-shadow-xl w-full">
              <div className="stat place-items-center">
                <div className="stat-title">Mumbai</div>
                <div className="stat-value text-primary">{mumbaiBalance ?? '0'} MATIC</div>
                <div className="stat-desc">Balance</div>
              </div>
            </div>

            <div className="stats shadow drop-shadow-xl w-full my-4">
              <div className="stat place-items-center">
                <div className="stat-title">Fuji</div>
                <div className="stat-value text-error">{fujiBalance ?? '0'} AVAX</div>
                <div className="stat-desc">Balance</div>
              </div>
            </div>

            <div className="stats shadow drop-shadow-xl w-full">
              <div className="stat place-items-center">
                <div className="stat-title">Ropsten</div>
                <div className="stat-value">{ropstenBalance ?? '0'} ETH</div>
                <div className="stat-desc">Balance</div>
              </div>
            </div>

            <div className="stats shadow drop-shadow-xl w-full my-4">
              <div className="stat place-items-center">
                <div className="stat-title">BSC TestNet</div>
                <div className="stat-value text-warning">{bscTestBalance ?? '0'} BNB</div>
                <div className="stat-desc">Balance</div>
              </div>
            </div>

            <div className="stats shadow drop-shadow-xl w-full">
              <div className="stat place-items-center">
                <div className="stat-title">Fantom TestNet</div>
                <div className="stat-value text-info">{fantomTestBalance ?? '0'} FTM</div>
                <div className="stat-desc">Balance</div>
              </div>
            </div>

          </div>

          <div className="w-4/12 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold">Supported Chains</h1>
            <div className="w-full flex justify-center mt-7">
              { supportedNetworks.length > 0 && (
                <>
                  <div className="w-4/12 flex justify-around">
                    { supportedNetworks.map((i,k) => (
                      <button key={k} className="btn btn-ghost">
                        <img src={i.logos[0]} alt="logo" className="w-11 h-11" />
                      </button>
                    )) }
                  </div>
                </>

              ) }
            </div>

            <div className="mt-8 w-8/12">
              <BscMumbaiBridge />
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}
