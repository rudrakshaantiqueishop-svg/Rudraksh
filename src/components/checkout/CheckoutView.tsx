"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/components/CurrencyProvider";
import PayWithRazorpayButton from "@/components/checkout/PayWithRazorpayButton";
import type { CartItem } from "@/lib/cart";

type AddressLite = {
  id: string;
  label: string | null;
  fullName: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export default function CheckoutView({
  items,
  addresses,
  itemCount,
  subtotalCents,
}: {
  items: CartItem[];
  addresses: AddressLite[];
  itemCount: number;
  subtotalCents: number;
}) {
  const { formatPrice } = useCurrency();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Order summary */}
      <div className="lg:col-span-2 flex flex-col gap-4 border border-[#E7DFD6] p-6 h-fit">
        <h2 className="font-prata text-xl text-dark m-0">Order Summary</h2>
        <div className="flex flex-col">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b border-[#E7DFD6] last:border-0">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-[#F0E8DD]">
                {item.image && <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />}
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className="font-lato text-sm text-dark m-0">{item.name}</p>
                {(item.variantLabel || item.sizeLabel || item.addOnLabel) && (
                  <p className="font-lato text-xs text-gray-text m-0">
                    {[item.variantLabel, item.sizeLabel, item.addOnLabel].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="font-lato text-xs text-gray-text m-0">Qty: {item.quantity}</p>
              </div>
              <span className="font-lato text-sm font-bold text-dark shrink-0">
                {formatPrice(item.unitPriceCents * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-lato text-sm pt-2 border-t border-[#E7DFD6]">
          <span className="text-dark font-semibold">Subtotal ({itemCount} items)</span>
          <span className="text-dark font-bold">{formatPrice(subtotalCents)}</span>
        </div>
        <p className="font-lato text-xs text-gray-text m-0">Shipping & taxes calculated at payment.</p>
      </div>

      {/* Address + Pay */}
      <div className="flex flex-col gap-5 border border-[#E7DFD6] p-6 h-fit">
        <h2 className="font-prata text-xl text-dark m-0">Shipping Address</h2>

        {addresses.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="font-lato text-sm text-gray-text m-0">You don&apos;t have a saved address yet.</p>
            <Link
              href="/account/addresses"
              className="font-lato text-xs font-bold tracking-[0.5px] text-brown border-b border-brown pb-1 self-start"
            >
              ADD AN ADDRESS
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {addresses.map((address) => (
              <label
                key={address.id}
                className={`flex items-start gap-3 border p-3 cursor-pointer transition-colors ${
                  selectedAddressId === address.id ? "border-brown" : "border-[#E7DFD6]"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  className="mt-1"
                  checked={selectedAddressId === address.id}
                  onChange={() => setSelectedAddressId(address.id)}
                />
                <span className="flex flex-col gap-0.5">
                  <span className="font-lato text-sm font-semibold text-dark">
                    {address.label ?? "Address"}
                    {address.isDefault ? " (Default)" : ""}
                  </span>
                  <span className="font-lato text-xs text-gray-text">
                    {address.fullName}, {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} {address.postalCode}, {address.country}
                  </span>
                  <span className="font-lato text-xs text-gray-text">{address.phone}</span>
                </span>
              </label>
            ))}
            <Link
              href="/account/addresses"
              className="font-lato text-xs font-bold tracking-[0.5px] text-brown border-b border-brown pb-1 self-start"
            >
              MANAGE ADDRESSES
            </Link>
          </div>
        )}

        <PayWithRazorpayButton addressId={selectedAddressId} />
      </div>
    </div>
  );
}
