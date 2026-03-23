import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description: "Cooperative feminine du Souss-Massa, gardiennes du savoir-faire arganier ancestral depuis plus de 10 ans.",
};

export default function AboutPage() {
  return <AboutContent />;
}
