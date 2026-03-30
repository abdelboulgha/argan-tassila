import type { Metadata } from "next";
import Hero from "./sections/Hero";
import Panels from "./sections/Panels";
import Unesco from "./sections/Unesco";
import Region from "./sections/Region";
import Ecology from "./sections/Ecology";

export const metadata: Metadata = {
  title: "Origines",
  description: "L'arganier, tresor endemique du Maroc, inscrit au patrimoine UNESCO depuis 1998.",
};

export default function OriginsPage() {
  return (
    <>
      <Hero />
      <Panels />
      <Unesco />
      <Region />
      <Ecology />
    </>
  );
}
