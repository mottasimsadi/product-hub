import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProductHighlights />
    </div>
  );
}