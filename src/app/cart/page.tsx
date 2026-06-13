"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Minus, Plus, Trash2, ShoppingBag, AlertCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";

export default function CartPage() {
  const { items, itemCount, subtotalCents, isLoading, removeItem, updateQuantity, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  const guestBanner = !isAuthed && status !== "loading" && (
    <div className="flex items-center gap-3 bg-[#FBEFE3] border border-[#E7C9A6] px-4 py-3 mb-6">
      <AlertCircle size={18} className="text-brown shrink-0" />
      <p className="font-lato text-sm text-dark m-0">
        You&apos;re not logged in — your cart is only saved on this device.{" "}
        <Link href={`/login?callbackUrl=${encodeURIComponent("/cart")}`} className="font-bold underline text-brown">
          Log in
        </Link>{" "}
        to save your cart and checkout.
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <section className="h-px-section py-16 lg:py-24" style={{ background: "#FEF9F2" }}>
        {guestBanner}
        <div className="flex flex-col items-center text-center gap-4 py-16">
          <p className="font-lato text-sm text-gray-text m-0">Loading your cart...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="h-px-section py-16 lg:py-24" style={{ background: "#FEF9F2" }}>
        {guestBanner}
        <div className="flex flex-col items-center text-center gap-6">
          <ShoppingBag size={48} className="text-gray-text" strokeWidth={1.5} />
          <h1 className="font-prata text-3xl text-dark m-0">Your Cart is Empty</h1>
          <p className="font-lato text-sm text-gray-text m-0">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/products" className="bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] px-8 py-3.5">
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      {guestBanner}

      {/* Breadcrumb */}
      <div className="font-lato text-xs tracking-[0.5px] uppercase text-gray-text mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brown transition-colors">Home</Link>
        <span>›</span>
        <span className="text-dark font-semibold">Cart</span>
      </div>

      <h1 className="font-prata text-3xl lg:text-[34px] text-dark m-0 mb-8">Your Cart ({itemCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-5 border-b border-[#E7DFD6]">
              <Link href={`/products/${item.slug}`} className="relative w-24 h-24 shrink-0 overflow-hidden bg-[#F0E8DD]">
                {item.image && <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />}
              </Link>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <Link href={`/products/${item.slug}`} className="font-lato text-base text-dark hover:text-brown transition-colors">
                  {item.name}
                </Link>
                {(item.variantLabel || item.sizeLabel || item.addOnLabel) && (
                  <p className="font-lato text-xs text-gray-text m-0">
                    {[item.variantLabel, item.sizeLabel, item.addOnLabel].filter(Boolean).join(" · ")}
                  </p>
                )}
                <span className="font-lato text-sm font-bold text-dark mt-1">{formatPrice(item.unitPriceCents)}</span>
                <div className="flex items-center justify-between mt-2 gap-3">
                  <div className="flex items-center border border-[#E7DFD6]">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-dark" aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="font-lato text-sm text-dark w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-dark" aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1.5 text-gray-text hover:text-brown transition-colors font-lato text-xs font-bold tracking-[0.5px]"
                  >
                    <Trash2 size={14} /> REMOVE
                  </button>
                </div>
              </div>
              <span className="font-lato text-sm font-bold text-dark shrink-0">{formatPrice(item.unitPriceCents * item.quantity)}</span>
            </div>
          ))}

          <button onClick={clearCart} className="self-start mt-4 font-lato text-xs font-bold tracking-[0.5px] text-brown underline">
            CLEAR CART
          </button>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-5 border border-[#E7DFD6] p-6 h-fit">
          <h2 className="font-prata text-xl text-dark m-0">Order Summary</h2>
          <div className="flex items-center justify-between font-lato text-sm">
            <span className="text-gray-text">Subtotal ({itemCount} items)</span>
            <span className="text-dark font-bold">{formatPrice(subtotalCents)}</span>
          </div>
          <p className="font-lato text-xs text-gray-text m-0">Shipping & taxes calculated at checkout.</p>
          <Link
            href={isAuthed ? "/checkout" : `/login?callbackUrl=${encodeURIComponent("/checkout")}`}
            className="w-full text-center bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] py-3.5"
          >
            PROCEED TO CHECKOUT
          </Link>
          <Link href="/products" className="w-full text-center border border-brown text-brown font-lato text-sm font-bold tracking-[0.5px] py-3.5">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </section>
  );
}
