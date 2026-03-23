import type { Metadata } from "next";
import OriginsContent from "@/components/origins/OriginsContent";

export const metadata: Metadata = {
  title: "Origines",
  description: "L'arganier, tresor endemique du Maroc, inscrit au patrimoine UNESCO depuis 1998.",
};

export default function OriginsPage() {
  return <OriginsContent />;
}
