import { useContract } from "@starknet-react/core";
import { createContext, useEffect, useState } from "react";
import { Abi } from "starknet";
import penroseAbi from "../abi/penrose.json";
import { ASPECT_TESTNET_API, PENROSE_CONTRACT_ADDRESS } from "../constants";

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

export const TokenURIContext = createContext<any | undefined>(undefined)

export default function TokenURIProvider({ children }: any) {
  const [tokenURI, setTokenURI] = useState<any | undefined>(undefined)
  const { contract } = useContract({
    abi: penroseAbi as Abi,
    address: PENROSE_CONTRACT_ADDRESS
  });

  useEffect(() => {
    const fetchTokenURI = async () => {
      if (!contract) return;

      try {
        const tokenId = Number((await contract.getNumToken()).toString());

        let contractTokenURI =
          await fetch(ASPECT_TESTNET_API + PENROSE_CONTRACT_ADDRESS + "/" + tokenId)
            .then(res => res.json());

        let tryTokenId = tokenId;
        while (!(contractTokenURI.image_uri) && tryTokenId > 1) {
          contractTokenURI = await fetch(ASPECT_TESTNET_API + PENROSE_CONTRACT_ADDRESS + "/" + --tryTokenId)
            .then(res => res.json());
        }

        setTokenURI(contractTokenURI);
      } catch (e) {
        console.log(e);
      }
    }

    fetchTokenURI();
  }, [contract])



  return (
    <TokenURIContext.Provider value={tokenURI}>
      {children}
    </TokenURIContext.Provider>
  )
}

// export default function TokenURIProvider({ children }: any) {
//   const [tokenURI, setTokenURI] = useState<TokenURIInterface | undefined>(undefined)
//   const { contract } = useContract({
//     abi: penroseAbi as Abi,
//     address: PENROSE_CONTRACT_ADDRESS
//   });

//   useEffect(() => {
//     const fetchTokenURI = async () => {
//       if (!contract) return;

//       const numToken = Number((await contract.getNumToken()).toString());
//       const fetchTokenURI_RETRY = async (tokenId: number) => {
//         let tokenURI;
//         try {
//           tokenURI = await contract.tokenURI(bnToUint256(tokenId));
//           if (!tokenURI) { throw new Error("tokenURI is null") }
//           return tokenURI;
//         } catch (e) {
//           console.log("Retrying,", e);
//           fetchTokenURI_RETRY(tokenId);
//         }
//       }

//       const tokenURI = await fetchTokenURI_RETRY(numToken);

//       if (tokenURI) {
//         const contractTokenURI = {
//           lastTokenId: numToken,
//           lastTokenURI: decodeTokenURI(tokenURI),
//         }
//         setTokenURI(contractTokenURI);
//       }
//     }

//     fetchTokenURI();
//   }, [contract])



//   return (
//     <TokenURIContext.Provider value={tokenURI}>
//       {children}
//     </TokenURIContext.Provider>
//   )
// }
