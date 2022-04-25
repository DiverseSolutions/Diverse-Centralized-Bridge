import Link from 'next/link'
import {} from 'react'


export default function Nav(){
  return (
    <>
      <div className="navbar bg-base-100 pt-2">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabindex="0" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <Link href="https://faucet.dsolutions.mn/">
                <li><a>Diverse Faucet</a></li>
              </Link>
              <Link href="https://metamask.dsolutions.mn/">
                <li><a>Diverse Metamask</a></li>
              </Link>
              <Link href="https://ethcalculator.dsolutions.mn/">
                <li><a>Diverse Calculator</a></li>
              </Link>
              <Link href="https://github.com/DiverseSolutions">
                <li><a>Diverse Github</a></li>
              </Link>
              <Link href="https://www.dsolutions.mn/">
                <li><a>About</a></li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="https://www.dsolutions.mn/">
            <a className="text-2xl btn btn-ghost normal-case text-xl"><span className="text-blue-600 mr-1">Diverse</span> Centralized Bridge</a>
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-primary">Connect To Metamask</button>
        </div>
      </div>
    </>
  )
}
