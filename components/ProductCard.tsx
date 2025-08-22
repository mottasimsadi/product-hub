import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProduct } from "@/lib/models";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>${product.price.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product.description.substring(0, 100)}...</p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product._id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
