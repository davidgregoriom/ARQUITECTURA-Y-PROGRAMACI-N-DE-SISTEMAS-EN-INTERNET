import { TestSchema } from "./schemas.ts";
import { MongoClient,ObjectId } from "mongo";
import { config } from "dotenv";

const env=config();

if(!env.mongo_usr|| !env.mongo_pwd){
    throw new Error("Missing mongo credentials");
}

const dbName="Nebrija";

const client = new MongoClient()

await client.connect(
  `mongodb+srv://${env.mongo_usr}:${env.mongo_pwd}@nebrija.6hex9ia.mongodb.net/${dbName}?authMechanism=SCRAM-SHA-1`,
);
const db=client.database(dbName);
console.info(`Mongo DB ${dbName} conected`);

export const slotsCollection = db.collection<SlotSchema>("Slots");