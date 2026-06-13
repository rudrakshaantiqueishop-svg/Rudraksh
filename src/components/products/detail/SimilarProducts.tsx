"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { getMainImage } from "@/lib/product-utils";
import type { ProductImageLite } from "@/lib/product-utils";

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
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="flex flex-col gap-3 group flex-shrink-0 w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                {image && <Image src={image.url} alt={image.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-lato text-sm text-dark m-0">{p.name}</p>
                <p className="font-lato text-sm m-0 flex items-center gap-2">
                  <span className="font-bold text-dark">{formatPrice(p.priceCents)}</span>
                  {p.compareAtPriceCents != null && (
                    <span className="text-gray-text line-through">{formatPrice(p.compareAtPriceCents)}</span>
                  )}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
