import { createContext, useState, useEffect } from "react";

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

const INITIAL_DATA = {
  lastPrice: 0.1,
  currentPrice: 0.15,
  targetEms: 100,
  priceHist: priceHist
}

interface PriceDataInterface {
  blockNumber: number,
  tokenId: number,
  price: number
}

interface CrispInterface {
  lastPrice: number,
  currentPrice: number,
  targetEms: number,
  priceHist: PriceDataInterface[]
}


export const CrispContext = createContext<CrispInterface | undefined>(undefined)

export default function CrispProvider({ children }: any) {
  const [crispData, setCrispData] = useState<CrispInterface | undefined>(undefined)

  useEffect(() => {
    setCrispData(INITIAL_DATA)
  }, [crispData])

  return (
    <CrispContext.Provider value={crispData}>
      {children}
    </CrispContext.Provider>
  )
}
