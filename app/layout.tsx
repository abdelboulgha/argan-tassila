import type { Metadata } from "next";
import { Playfair_Display, Inter, Amiri } from "next/font/google";
import "@/styles/globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { LenisProvider } from "@/lib/lenis";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Argan Tassila — Cooperative Artisanale du Souss-Massa",
    template: "%s | Argan Tassila",
  },
  description:
    "Cooperative feminine du Souss-Massa productrice d'huile d'argan pure, d'amlou louz et de couscous artisanal. Authenticite et tradition marocaine.",
  keywords:
    "huile d'argan, amlou louz, couscous artisanal, Maroc, Souss-Massa, cooperative",
  openGraph: {
    title: "Argan Tassila — L'or liquide du Maroc",
    description:
      "Authenticite, tradition et savoir-faire artisanal depuis le coeur du Souss.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${playfair.variable} ${inter.variable} ${amiri.variable}`}
    >
      <body className="font-sans bg-white text-dark overflow-x-hidden">
        <LanguageProvider>
          <LenisProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
