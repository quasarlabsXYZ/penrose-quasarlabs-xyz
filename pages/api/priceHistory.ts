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
  await client.connect();

  const database = await client.db("CRISP");
  const collection = await database.collection("priceHistory");
  const priceHistory = await collection.find().toArray();

  await client.close();
  res.status(200).json(
    priceHistory
  );
}
