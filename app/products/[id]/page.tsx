import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

// Fetch a single product by ID from the database using the mongodb driver
async function getProduct(id: string) {
  try {
    const { db } = await connectToDatabase();
    // Validate that the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return null;
    }
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return null;
    }

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Database fetch failed:", error);
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto py-8 text-center">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            {/* Placeholder for an image */}
            <div className="h-96 rounded-lg bg-secondary"></div>
          </div>
          <div>
            <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
            <p className="mb-4 text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
            <Button className="mt-8">Add to Cart</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
