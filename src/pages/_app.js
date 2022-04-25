import { Provider } from 'react-redux'

import '../styles/globals.css'
import Nav from '../components/Nav';
import store from '../store';

import CheckMetamask from '../components/CheckMetamask';
import CheckNetwork from '../components/CheckNetwork';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CheckMetamask>
        <CheckNetwork>
          <Nav />
          <Component {...pageProps} />
        </CheckNetwork>
      </CheckMetamask>
    </Provider>
  )
}

export default MyApp
