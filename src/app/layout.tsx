import type { Metadata } from "next";
import { Lato, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import GoogleOneTap from "@/components/auth/GoogleOneTap";
import CurrencyProvider from "@/components/CurrencyProvider";
import CartProvider from "@/components/CartProvider";
import WishlistProvider from "@/components/WishlistProvider";

const lato = Lato({
  variable: "--lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const prata = Prata({
  variable: "--prata",
  subsets: ["latin"],
  weight: "400",
});

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Rudraksha Antique",
    default: "Rudraksha Antique | Premium Healing & Spiritual Jewelry",
  },
  description: "Discover authentic, premium quality Rudraksha beads, healing crystals, and spiritual jewelry. Certified and energized for your spiritual journey.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Rudraksha Antique",
    title: "Rudraksha Antique | Premium Healing & Spiritual Jewelry",
    description: "Discover authentic, premium quality Rudraksha beads and spiritual jewelry.",
    images: [
      {
        url: "/assets/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Rudraksha Antique Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudraksha Antique | Premium Healing & Spiritual Jewelry",
    description: "Discover authentic, premium quality Rudraksha beads and spiritual jewelry.",
    images: ["/assets/images/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${prata.variable}`}>
      <body suppressHydrationWarning>
        <SessionProviderWrapper>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <GoogleOneTap />
                <Header />
                <div style={{ paddingTop: "72px" }}>
                  {children}
                </div>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
