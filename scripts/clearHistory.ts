import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();

async function clearHistory() {
  const client = new MongoClient(process.env.MONGO_DB_URL!);
  await client.connect();

  const database = await client.db("CRISP");
  const collection = await database.collection("priceHistory");

  const numItems = (await collection.find().toArray()).length;

  if (numItems > 0) {
    console.log(`Clearing ${numItems} price history items...`);
    await collection.deleteMany({});
    console.log("Deleted all data from price history collection.");
  }

  await client.close();
}

clearHistory();