import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { IProduct } from "@/lib/models";

const PRODUCTS_COLLECTION = "products";

// GET: Fetch all products
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const products = await db
      .collection(PRODUCTS_COLLECTION)
      .find({})
      .toArray();
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

// POST: Create a new product
export async function POST(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const product: IProduct = await req.json();

    // Basic validation
    if (!product.name || !product.description || product.price == null) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.collection(PRODUCTS_COLLECTION).insertOne(product);

    return NextResponse.json(
      { success: true, data: { ...product, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 400 }
    );
  }
}
