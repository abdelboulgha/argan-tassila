import type { Metadata } from "next";
import Hero from "./sections/Hero";
import InfoCards from "./sections/InfoCards";
import ContactForm from "./sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez la cooperative Argan Tassila pour vos commandes ou renseignements.",
};

export default function ContactPage() {
  return (
    <>
      <Hero />
      <InfoCards />
      <ContactForm />
    </>
  );
}
