import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-bold">Welcome to MyShop</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Discover our amazing collection of products. Built with modern
        technology for a seamless experience.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Get Started</Button>
        </Link>
      </div>
    </section>
  );
}
