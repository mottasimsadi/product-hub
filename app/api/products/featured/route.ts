import { NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const productsCollection = await getProductsCollection();

    // Fetch products marked as featured
    const featuredProducts = await productsCollection
      .find({ isFeatured: true })
      .limit(3) // Limit to 3 featured products
      .toArray();

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}
