"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { getMainImage } from "@/lib/product-utils";
import type { ProductImageLite } from "@/lib/product-utils";

export type BaseProduct = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  images: ProductImageLite[];
};

export default function ProductCard({
  product,
  className = "",
  imageClassName = "aspect-[4/5]",
}: {
  product: BaseProduct;
  className?: string;
  imageClassName?: string;
}) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const image = getMainImage(product.images);
  const wishlisted = isWishlisted(product.id);

  return (
    <Link href={`/products/${product.slug}`} className={`flex flex-col gap-3 group/card ${className}`}>
      <div className={`relative overflow-hidden bg-[#F0E8DD] ${imageClassName}`}>
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        )}

        {/* Wishlist icon - top right - always visible */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={wishlisted ? "fill-[#BB5A28] text-[#BB5A28]" : "text-dark"} />
        </button>

        {/* Bottom Bar: Quantity Adjuster + Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 flex h-12 z-10" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          {/* Quantity adjuster (15%) */}
          <div className="w-[15%] bg-[#FEF9F2] flex items-center justify-between border-t border-r border-[#E7DFD6] text-dark">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity((q) => Math.max(1, q - 1)); }}
              className="flex-1 h-full flex items-center justify-center font-lato text-base hover:bg-black/5 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="font-lato text-xs font-bold text-center flex-shrink-0">{quantity}</span>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity((q) => q + 1); }}
              className="flex-1 h-full flex items-center justify-center font-lato text-base hover:bg-black/5 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          {/* Add to Cart button (85%) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem({
                id: product.id,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: image?.url ?? "",
                unitPriceCents: product.priceCents,
              }, quantity);
              setQuantity(1); // Reset after adding
            }}
            className="w-[85%] bg-brown text-white font-lato text-xs font-bold tracking-[0.8px] hover:bg-[#431f0d] transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-1">
        <p className="font-prata text-[15px] leading-[140%] text-dark m-0">{product.name}</p>
        <p className="font-lato text-sm m-0 flex items-center gap-2">
          <span className="font-medium text-dark">{formatPrice(product.priceCents)}</span>
          {product.compareAtPriceCents != null && (
            <span className="text-gray-text line-through text-xs">{formatPrice(product.compareAtPriceCents)}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
