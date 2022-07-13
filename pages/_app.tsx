import { getInstalledInjectedConnectors, StarknetProvider } from '@starknet-react/core'
import PenroseProvider from '../context/PenroseContext'
import CrispProvider from '../context/CrsipContext'
import type { AppProps } from 'next/app'

import "../styles/globals.css"
import "../styles/selection.css"

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors()

  return (
    <StarknetProvider connectors={connectors} autoConnect>
      <PenroseProvider>
        <CrispProvider>
          <Component {...pageProps} />
        </CrispProvider>
      </PenroseProvider>
    </StarknetProvider>
  )
}

export default MyApp
