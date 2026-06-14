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

export default function DesktopSearch({ onToggle }: { onToggle?: (isOpen: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setResults([]);
    }
    onToggle?.(isOpen);
  }, [isOpen, onToggle]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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

  return (
    <div className="relative flex items-center" ref={containerRef}>
      {/* Expanding input wrapper */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
          isOpen ? "w-[240px] xl:w-[300px] opacity-100 mr-2" : "w-0 opacity-0"
        }`}
      >
        <div className="w-full flex items-center border-b border-[#44403C] pb-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent outline-none font-lato text-sm text-[#0B0404] placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Toggle search" 
        className="text-[#44403C] hover:text-[#BB5A28] transition-colors flex-shrink-0"
      >
        {isOpen ? <X size={24} strokeWidth={1.5} /> : <Search size={24} strokeWidth={1.5} />}
      </button>

      {/* Results Dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div 
          className="absolute top-full right-0 mt-4 w-[350px] bg-[#FEF9F2] rounded-md overflow-hidden z-50"
          style={{ boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
        >
          <div className="flex flex-col max-h-[60vh] overflow-y-auto p-2">
            {isLoading ? (
              <p className="font-lato text-sm text-gray-text p-4 m-0 text-center">Searching...</p>
            ) : results.length === 0 ? (
              <p className="font-lato text-sm text-gray-text p-4 m-0 text-center">No products found for &quot;{query}&quot;.</p>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-2 hover:bg-black/5 transition-colors rounded-md"
                >
                  <div className="relative w-12 h-12 shrink-0 overflow-hidden bg-[#F0E8DD] rounded">
                    {product.images[0] && (
                      <Image src={product.images[0].url} alt={product.images[0].alt} fill sizes="48px" className="object-cover" />
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
      )}
    </div>
  );
}
