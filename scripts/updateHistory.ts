import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import { Abi, Contract } from "starknet";
import penroseAbi from "../abi/penrose.json";
import { PENROSE_CONTRACT_ADDRESS } from "../constants";
import fetch from "cross-fetch";

global.fetch = fetch;
dotenv.config();

async function updateHistory() {
  const contract = new Contract(penroseAbi as Abi, PENROSE_CONTRACT_ADDRESS);
  const client = new MongoClient(process.env.MONGO_DB_URL!);
  await client.connect();

  const database = await client.db("CRISP");
  const collection = await database.collection("priceHistory");
  const priceHistory = await collection.find().toArray();

  let numToken;
  try {
    numToken = Number((await contract.getNumToken()).toString());
  } catch (e) {
    console.log(e)
    numToken = 0;
  }

  if (priceHistory.length >= numToken) return client.close();

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

    await collection.insertOne({
      blockNumber: blockNumber,
      tokenId: tokenId,
      price: lastPrice
    })
  }
  console.log("Finished updating price history.");
  await client.close();
}

async function start() {
  const START = true;
  while (START) {
    await updateHistory();
    console.log("Sleeping for 10 seconds...");
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

start();