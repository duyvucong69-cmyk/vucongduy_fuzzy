import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside Vercel or .env");
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export function isMongoDbEnabled(): boolean {
  return !!MONGODB_URI;
}
