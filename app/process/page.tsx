import type { Metadata } from "next";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Timeline from "./sections/Timeline";
import Engagements from "./sections/Engagements";
import QuoteBanner from "./sections/QuoteBanner";

export const metadata: Metadata = {
  title: "Notre Savoir-Faire",
  description: "De la recolte des fruits d'arganier a la mise en flacon, decouvrez notre processus artisanal.",
};

export default function ProcessPage() {
  return (
    <>
      <Hero />
      <Intro />
      <Timeline />
      <Engagements />
      <QuoteBanner />
    </>
  );
}
