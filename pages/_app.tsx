import { getInstalledInjectedConnectors, StarknetProvider } from '@starknet-react/core'
import type { AppProps } from 'next/app'

import DataProvider from '../context/DataContext'
import TokenURIProvider from '../context/TokenURIcontext'
import "../styles/globals.css"
import "../styles/utils.css"

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors()

  return (
    <StarknetProvider connectors={connectors}>
      <DataProvider>
        <TokenURIProvider>
          <Component {...pageProps} />
        </TokenURIProvider>
      </DataProvider>
    </StarknetProvider>
  )
}

export default MyApp
