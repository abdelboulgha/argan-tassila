import type { Metadata } from "next";
import Hero from "./sections/Hero";
import Catalog from "./sections/Catalog";
import OrderInstructions from "./sections/OrderInstructions";

export const metadata: Metadata = {
  title: "Nos Collections",
  description: "Decouvrez notre selection d'huile d'argan, amlou louz et couscous artisanal.",
};

export default function ProductsPage() {
  return (
    <>
      <Hero />
      <Catalog />
      <OrderInstructions />
    </>
  );
}
