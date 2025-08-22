import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { IProduct } from "@/lib/models";

async function getProducts(): Promise<IProduct[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const body = await res.json();
  return body.data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="mb-8 text-4xl font-bold">All Products</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: IProduct) => (
              <ProductCard key={product._id?.toString()} product={product} />
            ))}
          </div>
        ) : (
          <p>No products found. Add one from the dashboard!</p>
        )}
      </main>
      <Footer />
    </>
  );
}
