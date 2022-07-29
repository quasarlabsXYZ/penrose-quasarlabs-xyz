import { useStarknet, useStarknetExecute } from "@starknet-react/core";
import { useContext, useMemo } from "react";
import { makeAddress } from "starknet/dist/utils/stark";
import { bnToUint256 } from "starknet/dist/utils/uint256";
import { ETH_DEVNET_ADDRESS, PENROSE_CONTRACT_ADDRESS } from "../constants";
import { DataContext } from "../context/DataContext";

export const formatEthPrice = (price: number): string => {
  return `${price.toFixed(4)} Ξ`;
}

export const StatsAndMint = (props: any) => {
  const { totalSupply, targetEms, priceSpeed, priceHalflife, saleHalflife } = props.params;

  const Data = useContext(DataContext)
  const { account, connectors } = useStarknet();

  const approveAmount = bnToUint256(BigInt(69420e18)); // approve for an absurdly large amount, revoke later
  const zero = bnToUint256(BigInt(0)); // approve for an absurdly large amount, revoke later
  const { loading, error, execute } = useStarknetExecute({
    calls: [
      {
        contractAddress: ETH_DEVNET_ADDRESS,
        entrypoint: 'approve',
        calldata: [makeAddress(PENROSE_CONTRACT_ADDRESS), approveAmount.low.toString(), approveAmount.high.toString()]
      },
      {
        contractAddress: PENROSE_CONTRACT_ADDRESS,
        entrypoint: 'mint',
        calldata: []
      },
      {
        contractAddress: ETH_DEVNET_ADDRESS,
        entrypoint: 'approve',
        calldata: [makeAddress(PENROSE_CONTRACT_ADDRESS), zero.low.toString(), zero.high.toString()]
      },
      // {
      //   contractAddress: PENROSE_CONTRACT_ADDRESS,
      //   entrypoint: 'getNumToken',
      //   calldata: []
      // },
      // {
      //   contractAddress: PENROSE_CONTRACT_ADDRESS,
      //   entrypoint: 'tokenURI',
      //   calldata[]
      // }
    ],
    metadata: { message: "hello" }
  });

  // useEffect(() => {
  //   console.log("loading", loading);
  //   console.log("error", error);
  // }, [loading, error])

  const onMintClick = async () => {
    if (account) {
      const message = `Minting Penrose to ${account}`;
      const tx = await execute();
      console.log(tx, message, error);
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
        <p> {Data ? `${totalSupply - Data.numToken} / ${totalSupply}` : "-"}</p>
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
            <p> {targetEms.toFixed(4)}</p>
          </div>
          <div className='flex justify-between flex-col text-right'>
            <div className="text-gray-300 font-thin">price speed</div>
            <p> {priceSpeed.toFixed(4)}</p>
          </div>
        </div>
        <div className='flex justify-between flex-row'>
          <div className='flex justify-between flex-col'>
            <div className="text-gray-300 font-thin">price halflife</div>
            <p> {priceHalflife}</p>
          </div>
          <div className='flex justify-between flex-col text-right'>
            <div className="text-gray-300 font-thin">sale halflife</div>
            <p> {saleHalflife}</p>
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
        {account ? Data ? "Mint" : loading ? "Fetching..." : "Loading..." : "Connect Wallet"}
      </button>

    </div>
  )
}