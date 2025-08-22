import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Mock data for highlights
const highlightedProducts = [
  { id: 1, name: "Product A", description: "This is the best product ever." },
  { id: 2, name: "Product B", description: "A fantastic choice for everyone." },
  { id: 3, name: "Product C", description: "Unmatched quality and style." },
];

export function ProductHighlights() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {highlightedProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
