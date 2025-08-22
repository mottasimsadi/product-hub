import { MongoClient, Db, Collection } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper functions for database operations
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}

export async function getUsersCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection("users");
}

export async function getProductsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection("products");
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  inStock: boolean;
  features?: string[];
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
