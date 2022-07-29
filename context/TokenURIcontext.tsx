import { useContract } from "@starknet-react/core";
import { createContext, useEffect, useState } from "react";
import { Abi } from "starknet";
import { bnToUint256 } from "starknet/dist/utils/uint256";
import penroseAbi from "../abi/penrose.json";
import { PENROSE_CONTRACT_ADDRESS } from "../constants";

interface TokenURIInterface {
  lastTokenId: number,
  lastTokenURI: { name: string, attribute: { scheme: string, color: string }, image: string },
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

export const TokenURIContext = createContext<TokenURIInterface | undefined>(undefined)

export default function TokenURIProvider({ children }: any) {
  const [tokenURI, setTokenURI] = useState<TokenURIInterface | undefined>(undefined)
  const { contract } = useContract({
    abi: penroseAbi as Abi,
    address: PENROSE_CONTRACT_ADDRESS
  });

  useEffect(() => {
    const fetchTokenURI = async () => {
      if (!contract) return;

      // devided by 2 ** 61 for 64.61 fixed point
      // divided by 10 ** 18 for wei
      const numToken = Number((await contract.getNumToken()).toString());

      const fetchTokenURI_RETRY = async (tokenId: number) => {
        let tokenURI;
        try {
          tokenURI = await contract.tokenURI(bnToUint256(tokenId));
          console.log(tokenURI)
          return tokenURI;
        } catch (e) {
          console.log(e);
          console.log("retrying...");
          fetchTokenURI_RETRY(tokenId);
        }
      }

      const tokenURI = await fetchTokenURI_RETRY(numToken);
      const contractTokenURI = {
        lastTokenId: numToken,
        lastTokenURI: decodeTokenURI(tokenURI),
      }
      setTokenURI(contractTokenURI);
    }

    fetchTokenURI();
  }, [contract])



  return (
    <TokenURIContext.Provider value={tokenURI}>
      {children}
    </TokenURIContext.Provider>
  )
}
