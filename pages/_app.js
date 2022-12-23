import Layout from '../components/Layout'
import '../styles/globals.css'
import {Connector} from 'mqtt-react-hooks';
import AppProvider from '../lib/context';

export default function App({ Component, pageProps }) {
  return (
    <Connector
      brokerUrl={process.env.BROKER_URL}
      >
      <AppProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </Connector>
    // <AppProvider>
    //   <Layout>
    //     <Component {...pageProps} />
    //   </Layout>
    // </AppProvider>
  )
}
