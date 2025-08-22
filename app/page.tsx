import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProductHighlights } from "@/components/ProductHighlights";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductHighlights />
    </main>
  );
}
