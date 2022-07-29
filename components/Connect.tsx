import { useConnectors, useStarknet } from '@starknet-react/core';
import { useEffect, useState } from 'react';

function shortenAddress(address: string) {
  if (!address) return "";
  return address.substring(0, 4) + '...' + address.substring(address.length - 4)
}


export default function ConnectWallet() {
  const { account } = useStarknet()
  const { available, connect, disconnect } = useConnectors()
  const [selected, setSelected] = useState(1);

  const options: any = {
    1: (<a href="https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb">install argent x</a>),
    2: (
      <div>
        <span>connected: {shortenAddress(account!)} </span>
        <button onClick={() => disconnect()}>
          disconnect
        </button>
      </div>
    ),
    3: (
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

  useEffect(() => {

  }, [available, account])

  return (
    <div>
      {options[selected]}
    </div>
  )
}