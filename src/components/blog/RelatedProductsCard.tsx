"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

export default function RelatedProductsCard({ products }: { products: Product[] }) {
  const { formatPrice } = useCurrency();

  if (products.length === 0) return null;

  return (
    <div>
      <h3 className="font-prata text-lg text-dark m-0 pb-3 mb-1 border-b border-[#E7DFD6]">Related Products</h3>

      <ul className="flex flex-col">
        {products.map((product) => {
          const image = getMainImage(product.images);
          return (
            <li key={product.id} className="border-b border-[#EFE7DB]">
              <Link href={`/products/${product.slug}`} className="group/rp flex items-center gap-4 py-4">
                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#F0E8DD]">
                  {image && (
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover/rp:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-prata text-sm text-dark leading-snug line-clamp-2 group-hover/rp:text-brown transition-colors">
                    {product.name}
                  </span>
                  <span className="font-lato text-sm flex items-center gap-2">
                    <span className="font-semibold text-dark">{formatPrice(product.priceCents)}</span>
                    {product.compareAtPriceCents != null && (
                      <span className="text-gray-text line-through text-xs">
                        {formatPrice(product.compareAtPriceCents)}
                      </span>
                    )}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 mt-4 font-lato text-xs font-bold tracking-[1px] uppercase text-brown hover:gap-2.5 transition-all"
      >
        View All Products
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
