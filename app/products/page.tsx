import type { Metadata } from "next";
import ProductsContent from "@/components/products/ProductsContent";

export const metadata: Metadata = {
  title: "Nos Collections",
  description: "Decouvrez notre selection d'huile d'argan, amlou louz et couscous artisanal.",
};

export default function ProductsPage() {
  return <ProductsContent />;
}
