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

export const metadata: Metadata = {
  title: "Rudraksh | Premium Jewelry E-Commerce",
  description: "Exclusive full stack e-commerce application for premium jewelry",
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
