import { NextResponse } from "next/server";
import {
  getProductsCollection,
  getUsersCollection,
  Product,
} from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const productsCollection = await getProductsCollection();
    const usersCollection = await getUsersCollection();

    const products = await productsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Get author information for each product
    const productsWithAuthors = await Promise.all(
      products.map(async (product) => {
        const author = await usersCollection.findOne(
          { id: product.authorId },
          { projection: { passwordHash: 0 } }
        );

        return {
          ...product,
          author: author
            ? {
                id: author.id,
                name: author.name,
                email: author.email,
              }
            : null,
        };
      })
    );

    return NextResponse.json(productsWithAuthors);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, category, features, stock, authorId } =
      body;

    if (!name || !description || !price || !category || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const productsCollection = await getProductsCollection();

    const productData: Product = {
      id: new ObjectId().toString(),
      name,
      description,
      price: parseFloat(price),
      category,
      image: `https://picsum.photos/seed/${Math.random()
        .toString(36)
        .substring(7)}/400/300.jpg`,
      inStock: (parseInt(stock) || 0) > 0,
      features: features || [],
      stock: parseInt(stock) || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId,
    };

    const result = await productsCollection.insertOne(productData);

    // Get the created product with author information
    const usersCollection = await getUsersCollection();
    const author = await usersCollection.findOne(
      { id: authorId },
      { projection: { passwordHash: 0 } }
    );

    const createdProduct = {
      ...productData,
      _id: result.insertedId,
      author: author
        ? {
            id: author.id,
            name: author.name,
            email: author.email,
          }
        : null,
    };

    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}