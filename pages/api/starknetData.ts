// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Abi, Contract } from 'starknet';
import { bnToUint256 } from 'starknet/dist/utils/uint256';
import penroseAbi from "../../abi/penrose.json";
import { PENROSE_CONTRACT_ADDRESS } from '../../constants';

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
    .replace('xmlns="', 'xmlns=\\"')
    // .replace('</svg>"', '</svg>\\"')
    .replace("data:application/json;charset=utf-8,", "")

  return JSON.parse(results);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataInterface>
) {
  const penrose = new Contract(
    penroseAbi as Abi,
    PENROSE_CONTRACT_ADDRESS
  )
  const numToken = Number((await penrose.getNumToken()).toString());
  const penroseData = {
    totalSupply: Number((await penrose.getTotalSupply()).toString()),
    numToken: numToken,
    lastTokenId: numToken,
    lastTokenURI: decodeTokenURI(await penrose.tokenURI(bnToUint256(numToken))),
    lastPrice: 0.1,
    currentPrice: Number((await penrose.getQuote()).toString()) / 2 ** 61 / 10 ** 18,
    targetEms: Number((await penrose.getTargetEMS()).toString()) / 2 ** 61,
    nextPurchaseStartingPrice: Number((await penrose.getNextPurchaseStartingPrice()).toString()) / 10 ** 18,
    lastPurchaseBlock: Number((await penrose.getLastPurchaseBlock()).toString()),
    nextPurchaseStartingEms: Number((await penrose.getNextPurchaseStartingEMS()).toString()),
    priceSpeed: Number((await penrose.getPriceSpeed()).toString()) / 2 ** 61,
    priceHalflife: Number((await penrose.getPriceHalfLife()).toString()),
    saleHalflife: Number((await penrose.getSaleHalfLife()).toString()),
  }
  res.status(200).json(
    penroseData
  )
}
