"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import type { WishlistItem } from "@/lib/wishlist";

export default function WishlistGrid({ items }: { items: WishlistItem[] }) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const { toggleWishlist } = useWishlist();
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const visibleItems = items.filter((item) => !removedIds.has(item.productId));

  if (visibleItems.length === 0) {
    return (
      <div className="border border-border p-6">
        <p className="font-lato text-base text-[#78716C]">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {visibleItems.map((item) => (
        <div key={item.id} className="flex flex-col gap-2 border border-border p-3">
          <Link href={`/products/${item.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[#F0E8DD]">
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            )}
          </Link>

          <Link href={`/products/${item.slug}`} className="font-prata text-sm text-dark line-clamp-1">
            {item.name}
          </Link>

          <p className="font-lato text-sm font-medium text-dark m-0 flex items-center gap-2">
            {formatPrice(item.priceCents)}
            {item.compareAtPriceCents != null && (
              <span className="text-gray-text line-through text-xs">{formatPrice(item.compareAtPriceCents)}</span>
            )}
          </p>

          <div className="mt-auto flex gap-2">
            <button
              onClick={() =>
                addItem({
                  id: item.productId,
                  productId: item.productId,
                  slug: item.slug,
                  name: item.name,
                  image: item.image,
                  unitPriceCents: item.priceCents,
                })
              }
              className="flex-1 bg-brown text-white font-lato text-xs font-bold tracking-[0.5px] py-2 hover:bg-[#431f0d] transition-colors"
            >
              ADD TO CART
            </button>
            <button
              onClick={() => {
                toggleWishlist(item.productId);
                setRemovedIds((prev) => new Set(prev).add(item.productId));
              }}
              aria-label="Remove from wishlist"
              className="border border-[#E7DFD6] p-2 text-dark hover:text-destructive transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
