"use client";

import Image from "next/image";
import Link from "next/link";
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
  if (products.length === 0) return null;

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h2 className="font-prata text-2xl lg:text-3xl text-dark m-0">Similar Products</h2>
      </div>

      <div className="flex lg:grid lg:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible no-scrollbar scroll-smooth w-full">
        {products.map((p) => {
          return (
            <ProductCard 
              key={p.id} 
              product={p} 
              className="flex-shrink-0 w-[343px] lg:w-auto" 
              imageClassName="h-[511px] lg:h-auto lg:aspect-[301/370] w-full rounded-lg"
            />
          );
        })}
      </div>
    </section>
  );
}
