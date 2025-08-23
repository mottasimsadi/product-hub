import { NextResponse } from "next/server";
import { getProductsCollection, getUsersCollection } from "@/lib/mongodb";
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
        let author = null;

        // Only try to find author if authorId exists and is a valid ObjectId
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
            console.error(
              "Error finding author for product:",
              product._id,
              error
            );
          }
        }

        return {
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

    // Add better validation
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, description, price, or category",
        },
        { status: 400 }
      );
    }

    if (!authorId) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );
    }

    const productsCollection = await getProductsCollection();

    const productData = {
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
    let author = null;

    try {
      // Check if authorId is a valid ObjectId
      if (ObjectId.isValid(authorId)) {
        author = await usersCollection.findOne(
          { _id: new ObjectId(authorId) },
          { projection: { passwordHash: 0 } }
        );
      } else {
        // If not a valid ObjectId, try finding by other fields
        author = await usersCollection.findOne(
          { $or: [{ id: authorId }, { email: authorId }, { name: authorId }] },
          { projection: { passwordHash: 0 } }
        );
      }
    } catch (error) {
      console.error("Error finding author:", error);
    }

    const createdProduct = {
      ...productData,
      _id: result.insertedId,
      id: result.insertedId.toString(),
      author: author
        ? {
            id: author._id?.toString(),
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