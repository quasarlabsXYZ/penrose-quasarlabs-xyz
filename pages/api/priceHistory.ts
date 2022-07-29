import type { NextApiRequest, NextApiResponse } from 'next';

const priceHist = [
  {
    blockNumber: 239083271,
    tokenId: 1,
    price: 100
  },
  {
    blockNumber: 239083272,
    tokenId: 2,
    price: 80
  },
  {
    blockNumber: 239083273,
    tokenId: 3,
    price: 60
  },
  {
    blockNumber: 239083274,
    tokenId: 4,
    price: 40
  },
  {
    blockNumber: 239083275,
    tokenId: 5,
    price: 70
  },
  {
    blockNumber: 239083276,
    tokenId: 6,
    price: 130
  },
  {
    blockNumber: 239083286,
    tokenId: 7,
    price: 120
  },
  {
    blockNumber: 239083296,
    tokenId: 8,
    price: 150
  },
  {
    blockNumber: 239083297,
    tokenId: 9,
    price: 170
  },
  {
    blockNumber: 239083376,
    tokenId: 10,
    price: 130
  },
  {
    blockNumber: 239083380,
    tokenId: 11,
    price: 130
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
