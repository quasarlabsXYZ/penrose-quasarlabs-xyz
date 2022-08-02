import { MongoClient } from "mongodb";
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
  res: NextApiResponse<any[]>
) {
  const contract = new Contract(penroseAbi as Abi, PENROSE_CONTRACT_ADDRESS);

  const client = new MongoClient(process.env.MONGO_DB_URL!);
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
    res.status(400).json([]);
  }

  const database = await client.db("CRISP");
  const collection = await database.collection("priceHistory");
  const priceHistory = await collection.find().toArray();

  let numToken;
  try {
    numToken = Number((await contract.getNumToken()).toString());
  } catch { numToken = 0; }

  if (priceHistory.length < numToken) {
    console.log("Fetching price history from blockchain...");
    let tokenId = priceHistory.length;

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

      crispPriceHistory.insertOne({
        blockNumber: blockNumber,
        tokenId: tokenId,
        price: lastPrice
      })
    }
  }


  res.status(200).json(
    priceHistory
  );
}
