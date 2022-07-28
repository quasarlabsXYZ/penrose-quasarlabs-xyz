import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler( // TODO
  req: NextApiRequest,
  res: NextApiResponse<PriceDataInterface[]>
) {
  res.status(200).json(
    priceHist
  );
}
