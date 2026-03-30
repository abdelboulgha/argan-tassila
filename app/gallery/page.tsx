import type { Metadata } from "next";
import Hero from "./sections/Hero";
import GalleryGrid from "./sections/GalleryGrid";
import InstagramCta from "./sections/InstagramCta";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Explorez l'univers d'Argan Tassila en images.",
};

export default function GalleryPage() {
  return (
    <>
      <Hero />
      <GalleryGrid />
      <InstagramCta />
    </>
  );
}
