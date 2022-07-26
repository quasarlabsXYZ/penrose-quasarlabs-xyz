import { getInstalledInjectedConnectors, StarknetProvider } from '@starknet-react/core'
import type { AppProps } from 'next/app'

import DataProvider from '../context/DataContext'
import "../styles/globals.css"
import "../styles/selection.css"

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors()

  return (
    <StarknetProvider connectors={connectors} autoConnect>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </StarknetProvider>
  )
}

export default MyApp
