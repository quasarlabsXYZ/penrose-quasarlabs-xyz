import { useStarknet } from "@starknet-react/core";
import { useContext } from "react";

import { DataContext } from "../context/DataContext";

export const formatEthPrice = (price: number): string => {
  return `${price.toFixed(4)} Ξ`;
}

export const StatsAndMint = () => {
  const Data = useContext(DataContext)
  const { account } = useStarknet();

  const onMintClick = async () => {
    console.log("Minting...")
  }

  return (
    <div className='lg:p-5'>
      <h4>Statistics</h4>

      <div className='flex justify-between flex-row'>
        <div>remaining supply:</div>
        <p> {Data ? `${Data.totalSupply - Data.numToken} / ${Data.totalSupply}` : "-"}</p>
      </div>
      <div className='flex justify-between flex-row'>
        <div>current CRISP price:</div>
        <p>{Data ? formatEthPrice(Data.currentPrice) : "-"}</p>
      </div>
      <div className='flex justify-between flex-row'>
        <div>last purchase price:</div>
        <p> {Data ? formatEthPrice(Data.lastPrice) : "-"}</p>
      </div>

      <div className="mt-4">
        <div className='flex justify-between flex-row'>
          <div className='flex justify-between flex-col'>
            <div className="text-gray-300 font-thin">target ems</div>
            <p> {Data ? Data.targetEms.toFixed(4) : "-"}</p>
          </div>
          <div className='flex justify-between flex-col text-right'>
            <div className="text-gray-300 font-thin">price speed</div>
            <p> {Data ? Data.priceSpeed.toFixed(4) : "-"}</p>
          </div>
        </div>
        <div className='flex justify-between flex-row'>
          <div className='flex justify-between flex-col'>
            <div className="text-gray-300 font-thin">price halflife</div>
            <p> {Data ? Data.priceHalflife : "-"}</p>
          </div>
          <div className='flex justify-between flex-col text-right'>
            <div className="text-gray-300 font-thin">sale halflife</div>
            <p> {Data ? Data.saleHalflife : "-"}</p>
          </div>
        </div>
      </div>

      <p className="text-xs mt-5">* WTF are these metrics? Click <a href='https://www.quasarlabs.xyz/'>here</a> to learn more.</p>

      <button
        className={
          account
            ? "text-center h-10 outline p-2 mt-3 w-full no-underline"
            : "text-center h-10 outline p-2 mt-3 w-full no-underline text-gray-500 hover:text-gray-500"
        }
        onClick={onMintClick}
        disabled={!account}
      >
        {account ? "Mint" : "Wallet not connected"}
      </button>

    </div>
  )
}