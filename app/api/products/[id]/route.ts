import { NextResponse } from "next/server";
import { getProductsCollection, getUsersCollection } from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const productsCollection = await getProductsCollection();
    const usersCollection = await getUsersCollection();

    const product = await productsCollection.findOne({ id });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get author information
    const author = await usersCollection.findOne(
      { id: product.authorId },
      { projection: { passwordHash: 0 } }
    );

    const productWithAuthor = {
      ...product,
      author: author
        ? {
            id: author.id,
            name: author.name,
            email: author.email,
          }
        : null,
    };

    return NextResponse.json(productWithAuthor);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}