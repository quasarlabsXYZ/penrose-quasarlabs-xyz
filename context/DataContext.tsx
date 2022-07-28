import { createContext, useEffect, useState } from "react";

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
  lastTokenURI: { name: string, attribute: { scheme: string, color: string }, image: string },
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

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetch("./api/starknetData").then((res) => res.json()));
    }

    fetchData();
  });

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}
