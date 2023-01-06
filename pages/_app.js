import Layout from '../components/Layout'
import '../styles/globals.css'
import AppProvider from '../lib/context';

export default function App({ Component, pageProps }) {
  return (
  
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
