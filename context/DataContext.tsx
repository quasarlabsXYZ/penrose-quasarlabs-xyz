import { useContract } from "@starknet-react/core";
import { createContext, useEffect, useState } from "react";
import { Abi } from "starknet";
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
  lastTokenURI: string,
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
      const contractData = {
        totalSupply: Number((await contract.functions.getTotalSupply()).toString()),
        numToken: Number((await contract.functions.getNumToken()).toString()),
        lastTokenId: Number((await contract.functions.getNumToken()).toString()),
        lastTokenURI: "/demo.png",
        lastPrice: 0.1,
        currentPrice: Number((await contract.functions.getQuote()).toString()) / 2 ** 61 / 10 ** 18,
        targetEms: Number((await contract.functions.getTargetEMS()).toString()) / 2 ** 61,
        nextPurchaseStartingPrice: Number((await contract.functions.getNextPurchaseStartingPrice()).toString()) / 10 ** 18,
        lastPurchaseBlock: Number((await contract.functions.getLastPurchaseBlock()).toString()),
        nextPurchaseStartingEms: Number((await contract.functions.getNextPurchaseStartingEMS()).toString()),
        priceSpeed: Number((await contract.functions.getPriceSpeed()).toString()) / 2 ** 61,
        priceHalflife: Number((await contract.functions.getPriceHalfLife()).toString()),
        saleHalflife: Number((await contract.functions.getSaleHalfLife()).toString()),
        priceHist: priceHist
      }

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
