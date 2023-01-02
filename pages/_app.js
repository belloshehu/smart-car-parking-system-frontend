import Layout from '../components/Layout'
import '../styles/globals.css'
import {Connector} from 'mqtt-react-hooks';
import AppProvider from '../lib/context';

export default function App({ Component, pageProps }) {
  return (
    // <AppProvider>
    // <Connector
    //   // brokerUrl={`${process.env.BROKER_URL}`}
    //   brokerUrl='mqtt://tatrawo:K1FADvCXcoL0pYaf@tatrawo.cloud.shiftr.io'
    //   >
    //     <Layout>
    //         <Component {...pageProps} />
    //     </Layout>
    //     </Connector>
    //   </AppProvider>
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
