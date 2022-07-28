import { useContract, useStarknet, useStarknetInvoke } from "@starknet-react/core";
import { useContext, useEffect, useMemo } from "react";
import { Abi } from "starknet";
import penroseAbi from "../abi/penrose.json";
import { DataContext } from "../context/DataContext";


export const formatEthPrice = (price: number): string => {
  return `${price.toFixed(4)} Ξ`;
}

export const StatsAndMint = () => {
  const Data = useContext(DataContext)
  const { account } = useStarknet();
  const { contract } = useContract({
    abi: penroseAbi as Abi,
    address: process.env.NEXT_PUBLIC_PENROSE_CONTRACT_ADDRESS
  });

  const { loading, error, invoke } = useStarknetInvoke({
    contract,
    method: 'mint'
  })

  useEffect(() => {
    console.log("loading", loading);
    console.log("error", error);
  }, [loading, error])

  const onMintClick = async () => {
    if (account) {
      const message = `Minting Penrose to ${account}`;
      await invoke({
        args: [],
        metadata: { method: 'mint', message }
      });
    }
  }

  const mintButtonDisabled = useMemo(() => {
    if (loading) return true;
    return !account || !Data;
  }, [loading, account, Data])

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

      <p className="text-xs mt-6">* WTF are these metrics? Click <a href='https://www.quasarlabs.xyz/'>here</a> to learn more.</p>

      <button
        className={
          !mintButtonDisabled
            ? "text-center h-10 outline p-2 mt-3 w-full no-underline"
            : "text-center h-10 outline p-2 mt-3 w-full no-underline text-gray-500 hover:text-gray-500"
        }
        onClick={onMintClick}
        disabled={mintButtonDisabled}
      >
        {!mintButtonDisabled ? account ? "Mint" : "Wallet not connected" : "Loading..."}
      </button>

    </div>
  )
}