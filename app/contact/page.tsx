import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez la cooperative Argan Tassila pour vos commandes ou renseignements.",
};

export default function ContactPage() {
  return <ContactContent />;
}
