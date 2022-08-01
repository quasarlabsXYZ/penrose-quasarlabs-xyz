import fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Abi, Contract } from "starknet";
import penroseAbi from "../../abi/penrose.json";
import { PENROSE_CONTRACT_ADDRESS } from "../../constants";

interface PriceDataInterface {
  blockNumber: number,
  tokenId: number,
  price: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PriceDataInterface[]>
) {
  const contract = new Contract(penroseAbi as Abi, PENROSE_CONTRACT_ADDRESS);

  const rawData = fs.readFileSync("./pages/api/data/priceHistory.json", "utf8");
  if (!rawData) {
    res.status(400).json([]);
    return;
  }

  const priceHistory = JSON.parse(rawData);
  const history = priceHistory.salesLog as PriceDataInterface[];

  let numToken;
  try {
    numToken = Number((await contract.getNumToken()).toString());
  } catch { numToken = 0; }

  if (history.length < numToken) {
    console.log("Fetching price history from blockchain...");
    let tokenId = history.length;
    let salesLog: PriceDataInterface[] = priceHistory.salesLog;

    while (tokenId < numToken) {
      ++tokenId;
      console.log(`Fetching price history for token ${tokenId}...`);

      let lastPrice;
      try {
        tokenId > 0
          ? lastPrice = Number((await contract.getPurchasePrice(tokenId)).toString()) / 10 ** 18
          : lastPrice = 0;
      } catch { lastPrice = 0; }

      let blockNumber;
      try {
        tokenId > 0
          ? blockNumber = Number((await contract.getPurchaseBlock(tokenId)).toString())
          : blockNumber = 0;
      } catch (e) {
        console.log(e);
        blockNumber = 0;
      }

      salesLog.push({
        blockNumber: blockNumber,
        tokenId: tokenId,
        price: lastPrice
      })
    }

    fs.writeFile("./pages/api/data/priceHistory.json",
      JSON.stringify({ "salesLog": salesLog }),
      (err) => {
        if (err) throw err;
        console.log('updated priceHistory.json');
      }
    )

  }


  res.status(200).json(
    priceHistory.salesLog
  );
}
