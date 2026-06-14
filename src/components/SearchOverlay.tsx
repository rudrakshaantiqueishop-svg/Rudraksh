"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchProductsAction } from "@/app/actions/products";
import { useCurrency } from "@/components/CurrencyProvider";

type SearchProduct = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  images: { url: string; alt: string }[];
};

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      const products = await searchProductsAction(term);
      setResults(products);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-[110]" />

      {/* Panel */}
      <div
        className="fixed left-0 right-0 top-[72px] z-[111] bg-[#FEF9F2]"
        style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[#E7DFD6] pb-3">
            <Search size={20} strokeWidth={1.5} className="text-[#44403C]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 font-lato text-base text-dark bg-transparent outline-none"
            />
            <button onClick={onClose} aria-label="Close search" className="text-[#44403C] hover:text-[#BB5A28] transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
            {query.trim().length < 2 ? (
              <p className="font-lato text-sm text-gray-text m-0">Type at least 2 characters to search products.</p>
            ) : isLoading ? (
              <p className="font-lato text-sm text-gray-text m-0">Searching...</p>
            ) : results.length === 0 ? (
              <p className="font-lato text-sm text-gray-text m-0">No products found for &quot;{query}&quot;.</p>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2 hover:bg-black/5 transition-colors"
                >
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-[#F0E8DD]">
                    {product.images[0] && (
                      <Image src={product.images[0].url} alt={product.images[0].alt} fill sizes="56px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <p className="font-lato text-sm text-dark m-0 line-clamp-1">{product.name}</p>
                    <span className="font-lato text-sm font-bold text-dark">{formatPrice(product.priceCents)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
