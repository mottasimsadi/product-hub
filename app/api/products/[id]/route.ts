import { NextResponse } from "next/server";
import { getProductsCollection, getUsersCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    const { id } = await params; // Await the params promise

    const productsCollection = await getProductsCollection();
    const usersCollection = await getUsersCollection();

    let product;

    // Try to find by _id first (MongoDB ObjectId)
    try {
      product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
    } catch {
      // If ObjectId conversion fails, try finding by string id field
      product = await productsCollection.findOne({ id });
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get author information
    let author = null;
    if (product.authorId) {
      try {
        // Check if authorId is a valid ObjectId
        if (ObjectId.isValid(product.authorId)) {
          author = await usersCollection.findOne(
            { _id: new ObjectId(product.authorId) },
            { projection: { passwordHash: 0 } }
          );
        } else {
          // If not a valid ObjectId, try finding by other fields
          author = await usersCollection.findOne(
            {
              $or: [
                { id: product.authorId },
                { email: product.authorId },
                { name: product.authorId },
              ],
            },
            { projection: { passwordHash: 0 } }
          );
        }
      } catch (error) {
        console.error("Error finding author:", error);
      }
    }

    const productWithAuthor = {
      ...product,
      _id: product._id?.toString(),
      author: author
        ? {
            id: author._id?.toString(),
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
