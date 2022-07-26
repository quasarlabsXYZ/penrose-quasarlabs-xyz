import { useContract } from "@starknet-react/core";
import { createContext, useEffect, useState } from "react";
import { Abi } from "starknet";
import { bnToUint256 } from "starknet/dist/utils/uint256";
import penroseAbi from "../abi/penrose.json";
import { PENROSE_CONTRACT_ADDRESS } from "../constants";

const priceHist = [
  {
    blockNumber: 239083271,
    tokenId: 1000,
    price: 100
  },
  {
    blockNumber: 239083272,
    tokenId: 1000,
    price: 80
  },
  {
    blockNumber: 239083273,
    tokenId: 1000,
    price: 60
  },
  {
    blockNumber: 239083274,
    tokenId: 1000,
    price: 40
  },
  {
    blockNumber: 239083275,
    tokenId: 1000,
    price: 70
  },
  {
    blockNumber: 239083276,
    tokenId: 1000,
    price: 30
  },
];

interface PriceDataInterface {
  blockNumber: number,
  tokenId: number,
  price: number
}

interface DataInterface {
  totalSupply: number,
  numToken: number,
  lastTokenId: number,
  lastTokenURI: any[],
  lastPrice: number,
  currentPrice: number,
  targetEms: number,
  nextPurchaseStartingPrice: number,
  lastPurchaseBlock: number,
  nextPurchaseStartingEms: number,
  priceSpeed: number,
  priceHalflife: number,
  saleHalflife: number,
  priceHist: PriceDataInterface[]
}

function hexToString(hexString: string) {
  let hex = hexString.toString();
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

export function decodeTokenURI(felts: any) {
  let resstr = "";
  for (let felt of felts.tokenURI) {
    resstr += hexToString(felt.toString(16))
  }
  console.log(resstr);
  return resstr;
}

export const DataContext = createContext<DataInterface | undefined>(undefined)

export default function DataProvider({ children }: any) {
  const [data, setData] = useState<DataInterface | undefined>(undefined)
  const { contract } = useContract({
    abi: penroseAbi as Abi,
    address: PENROSE_CONTRACT_ADDRESS
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!contract) return;

      // devided by 2 ** 61 for 64.61 fixed point
      // divided by 10 ** 18 for wei
      const numToken = Number((await contract.getNumToken()).toString());
      const contractData = {
        totalSupply: Number((await contract.getTotalSupply()).toString()),
        numToken: numToken,
        lastTokenId: numToken,
        lastTokenURI: decodeTokenURI(await contract.tokenURI(bnToUint256(numToken))),
        lastPrice: 0.1,
        currentPrice: Number((await contract.getQuote()).toString()) / 2 ** 61 / 10 ** 18,
        targetEms: Number((await contract.getTargetEMS()).toString()) / 2 ** 61,
        nextPurchaseStartingPrice: Number((await contract.getNextPurchaseStartingPrice()).toString()) / 10 ** 18,
        lastPurchaseBlock: Number((await contract.getLastPurchaseBlock()).toString()),
        nextPurchaseStartingEms: Number((await contract.getNextPurchaseStartingEMS()).toString()),
        priceSpeed: Number((await contract.getPriceSpeed()).toString()) / 2 ** 61,
        priceHalflife: Number((await contract.getPriceHalfLife()).toString()),
        saleHalflife: Number((await contract.getSaleHalfLife()).toString()),
        priceHist: priceHist
      }
      console.log(contractData.lastTokenURI)
      setData(contractData);
    }

    fetchData();
  }, [contract])



  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}
