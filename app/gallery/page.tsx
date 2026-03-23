import type { Metadata } from "next";
import GalleryContent from "@/components/gallery/GalleryContent";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Explorez l'univers d'Argan Tassila en images.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
