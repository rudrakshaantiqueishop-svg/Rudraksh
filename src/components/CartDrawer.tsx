"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";

export default function CartDrawer() {
  const { items, itemCount, subtotalCents, isOpen, closeCart, removeItem, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-[110] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-[111] w-[90%] max-w-[400px] bg-[#FEF9F2] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7DFD6]">
          <h2 className="font-prata text-xl text-dark m-0">Your Cart ({itemCount})</h2>
          <button onClick={closeCart} aria-label="Close cart" className="text-dark">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={40} className="text-gray-text" strokeWidth={1.5} />
            <p className="font-lato text-sm text-gray-text m-0">Your cart is empty.</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="font-lato text-xs font-bold tracking-[0.5px] text-brown border-b border-brown pb-1"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-[#F0E8DD]">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="font-lato text-sm text-dark m-0 line-clamp-2">{item.name}</p>
                    {(item.variantLabel || item.sizeLabel || item.addOnLabel) && (
                      <p className="font-lato text-xs text-gray-text m-0">
                        {[item.variantLabel, item.sizeLabel, item.addOnLabel].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <div className="flex items-center border border-[#E7DFD6]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-dark"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-lato text-xs text-dark w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-dark"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-lato text-sm font-bold text-dark whitespace-nowrap">
                        {formatPrice(item.unitPriceCents * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="text-gray-text hover:text-brown transition-colors self-start"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E7DFD6] px-6 py-5 flex flex-col gap-4">
              <div className="flex items-center justify-between font-lato text-sm">
                <span className="text-dark font-semibold">Subtotal</span>
                <span className="text-dark font-bold">{formatPrice(subtotalCents)}</span>
              </div>
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full text-center border border-brown text-brown font-lato text-sm font-bold tracking-[0.5px] py-3"
              >
                VIEW CART
              </Link>
              <Link
                href={isAuthed ? "/checkout" : `/login?callbackUrl=${encodeURIComponent("/checkout")}`}
                onClick={closeCart}
                className="w-full text-center bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] py-3"
              >
                CHECKOUT
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
