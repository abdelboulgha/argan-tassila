import type { Metadata } from "next";
import ProcessContent from "@/components/process/ProcessContent";

export const metadata: Metadata = {
  title: "Notre Savoir-Faire",
  description: "De la recolte des fruits d'arganier a la mise en flacon, decouvrez notre processus artisanal.",
};

export default function ProcessPage() {
  return <ProcessContent />;
}
