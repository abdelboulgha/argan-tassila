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
    default: "Argan Tassila — Coopérative Artisanale du Souss-Massa",
    template: "%s | Argan Tassila",
  },
  description:
    "Coopérative féminine du Souss-Massa productrice d'huile d'argan pure, d'amlou louz et de couscous artisanal. Authenticité, tradition et savoir-faire marocain.",
  keywords: [
    "huile d'argan maroc",
    "huile d'argan pure",
    "amlou louz",
    "couscous artisanal maroc",
    "coopérative femmes maroc",
    "souss massa maroc",
    "produits naturels maroc",
    "argan oil morocco",
    "arganeraie souss",
    "argan tassila",
    "produits bio maroc",
    "huile argan alimentaire",
  ],
  authors: [{ name: "Argan Tassila" }],
  creator: "Argan Tassila",
  metadataBase: new URL("https://abdelillah-argan-tassila-c7s7zh6d9.vercel.app"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Argan Tassila — L'or liquide du Maroc",
    description:
      "Huile d'argan pure, amlou louz et couscous artisanal issus de la coopérative féminine du Souss-Massa. Authenticité et tradition marocaine.",
    url: "https://abdelillah-argan-tassila-c7s7zh6d9.vercel.app",
    siteName: "Argan Tassila",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Argan Tassila — Coopérative Artisanale du Souss-Massa",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Argan Tassila — Huile d'Argan Pure du Maroc",
    description:
      "Coopérative féminine du Souss-Massa. Huile d'argan, amlou louz et produits artisanaux 100% naturels.",
    images: ["/logo.png"],
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
      <head>
        <meta name="theme-color" content="#1a3a2a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Argan Tassila",
              image: "https://abdelillah-argan-tassila-c7s7zh6d9.vercel.app/logo.png",
              url: "https://abdelillah-argan-tassila-c7s7zh6d9.vercel.app",
              telephone: "+212",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
                addressLocality: "Souss-Massa",
                addressRegion: "Souss-Massa",
              },
              description:
                "Coopérative féminine du Souss-Massa productrice d'huile d'argan pure, d'amlou louz et de couscous artisanal.",
              areaServed: "Morocco",
              sameAs: [
                "https://www.instagram.com/argan_tassila",
              ],
            }),
          }}
        />
      </head>
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
