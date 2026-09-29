"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { orderNumber } from "@/lib/orders";

const AUTO_CLOSE_MS = 5_000;

export default function OrderSuccessModal({
  orderId,
  totalCents,
  onClose,
}: {
  orderId: string;
  totalCents: number;
  onClose?: () => void;
}) {
  // Lock body scroll while the modal is up.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Auto-close after 5 seconds — user can still dismiss earlier via the ✕.
  useEffect(() => {
    if (!onClose) return;
    const id = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(id);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-success-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        {/* Close (X) button — always visible and clickable */}
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-dark"
          >
            <X size={20} strokeWidth={2} />
          </button>
        )}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <Check size={32} strokeWidth={3} className="text-emerald-700" />
        </div>

        <h2 id="order-success-title" className="mt-5 font-prata text-2xl text-dark">
          Payment Successful
        </h2>
        <p className="mt-2 font-lato text-sm text-gray-text">
          Thank you — your order is confirmed and we&apos;ve started getting it ready.
        </p>

        <dl className="mt-6 flex flex-col gap-2 rounded-md bg-[#FAF6F1] p-4 font-lato text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-gray-text">Order number</dt>
            <dd className="font-semibold text-dark">{orderNumber(orderId)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-gray-text">Amount paid</dt>
            <dd className="font-semibold text-dark">{formatPrice(totalCents, "INR")}</dd>
          </div>
        </dl>

        <p className="mt-4 font-lato text-xs text-gray-text">
          A confirmation is saved to your account. You can follow your parcel from Order Placed
          through to Delivered on the order page.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/account/orders/${orderId}`}
            className="w-full rounded bg-[#552912] py-3.5 text-center font-lato text-sm font-bold tracking-[0.5px] text-white transition-all hover:bg-[#3D1D0D]"
          >
            TRACK MY ORDER
          </Link>
          <Link
            href="/products"
            className="w-full rounded border border-[#E7DFD6] py-3 text-center font-lato text-sm font-bold tracking-[0.5px] text-dark transition-colors hover:bg-[#FAF6F1]"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
}

