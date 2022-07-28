import { useContract } from "@starknet-react/core";
import { createContext, useEffect, useState } from "react";
import { Abi } from "starknet";
import { bnToUint256 } from "starknet/dist/utils/uint256";
import penroseAbi from "../abi/penrose.json";
import { PENROSE_CONTRACT_ADDRESS } from "../constants";

interface DataInterface {
  numToken: number,
  lastTokenId: number,
  lastTokenURI: { name: string, attribute: { scheme: string, color: string }, image: string },
  lastPrice: number,
  currentPrice: number,
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
  let results = "";
  for (let felt of felts.tokenURI) {
    results += hexToString(felt.toString(16))
  }
  results = results
    // .replace('xmlns="', 'xmlns=\\"')
    // .replace('</svg>"', '</svg>\\"')
    .replace("data:application/json;charset=utf-8,", "")

  return JSON.parse(results);
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
        numToken: numToken,
        lastTokenId: numToken,
        lastTokenURI: decodeTokenURI(await contract.tokenURI(bnToUint256(numToken))),
        lastPrice: Number((await contract.getLastPurchasePrice()).toString()) / 2 ** 61 / 10 ** 18,
        currentPrice: Number((await contract.getQuote()).toString()) / 2 ** 61 / 10 ** 18,
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
