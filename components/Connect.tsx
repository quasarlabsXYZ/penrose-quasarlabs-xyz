import { useStarknet, useConnectors } from '@starknet-react/core'

function shortenAddress(address: string) {
  return address.substring(0, 4) + '...' + address.substring(address.length - 4)
}

export default function ConnectWallet() {
  const { account } = useStarknet()
  const { available, connect, disconnect } = useConnectors()

  if (account) {
    return (
      <div>
        <span>connected: {shortenAddress(account)} </span>
        <button onClick={() => disconnect()}>
          disconnect
        </button>
      </div>
    )
  }

  if (available.length === 0) { // ask the user to install argent x if no wallet is found
    return <a href="https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb">install argent x</a>
  }

  return (
    <div>
      {available.map((connector) => (
        <li className='list-none' key={connector.id()}>
          <button onClick={() => connect(connector)}>
            {`connect ${connector.name().toLowerCase()}`}
          </button>
        </li>
      ))}
    </div>
  )
}