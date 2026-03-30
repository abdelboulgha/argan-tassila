import type { Metadata } from "next";
import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Stats from "./sections/Stats";
import Values from "./sections/Values";
import Certifications from "./sections/Certifications";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description: "Cooperative feminine du Souss-Massa, gardiennes du savoir-faire arganier ancestral depuis plus de 10 ans.",
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Stats />
      <Values />
      <Certifications />
    </>
  );
}
