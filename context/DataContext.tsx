import { useContract } from "@starknet-react/core";
import { createContext, useEffect, useState } from "react";
import { Abi } from "starknet";
import penroseAbi from "../abi/penrose.json";
import { PENROSE_CONTRACT_ADDRESS } from "../constants";

interface DataInterface {
  numToken: number,
  lastTokenId: number,
  lastPrice: number,
  currentPrice: number,
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

      let numToken;
      try {
        numToken = Number((await contract.getNumToken()).toString());
      } catch {
        numToken = 0;
      }

      let lastPrice;
      try {
        lastPrice = Number((await contract.getLastPurchasePrice()).toString()) / 10 ** 18
      } catch {
        lastPrice = 0;
      }

      let currentPrice;
      try {
        currentPrice = Number((await contract.getQuote()).toString()) / 2 ** 61 / 10 ** 18
      } catch {
        currentPrice = 0;
      }

      const contractData = {
        numToken: numToken,
        lastTokenId: numToken,
        lastPrice: lastPrice,
        currentPrice: currentPrice,
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
