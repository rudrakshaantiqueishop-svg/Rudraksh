"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { getMainImage } from "@/lib/product-utils";
import type { ProductImageLite } from "@/lib/product-utils";
import ProductCard from "@/components/ui/ProductCard";

type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  images: ProductImageLite[];
};

export default function SimilarProducts({ products, categorySlug }: { products: Product[]; categorySlug: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useCurrency();

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h2 className="font-prata text-2xl lg:text-3xl text-dark m-0">Similar Products</h2>
        <div className="flex items-center gap-4">
          <Link href={`/products/category/${categorySlug}`} className="font-lato text-sm font-bold tracking-[0.5px] text-dark border-b border-dark pb-1 hidden sm:inline">
            VIEW ALL
          </Link>
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-[#E7DFD6] flex items-center justify-center text-dark"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-brown flex items-center justify-center text-white"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
        {products.map((p) => {
          const image = getMainImage(p.images);
          return (
            <ProductCard 
              key={p.id} 
              product={p} 
              className="flex-shrink-0 w-[calc(50%-12px)] lg:w-[calc(25%-18px)]" 
              imageClassName="aspect-square rounded-lg"
            />
          );
        })}
      </div>
    </section>
  );
}
