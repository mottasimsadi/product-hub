import { MongoClient, Db, Collection, ObjectId } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "productDB"; // Use env variable or default
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
  return client.db(dbName); // Use the specified database name
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
  _id?: ObjectId; // MongoDB uses _id
  id?: string; // Optional string id for application use
  email: string;
  name: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product types
export interface Product {
  _id?: ObjectId;
  id?: string;
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
  isFeatured?: boolean;
}