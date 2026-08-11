"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_CART_QUANTITY } from "@/lib/cart";

type Size = "sm" | "md";

/**
 * The one quantity control used on the product page, the cart page and the cart
 * drawer. Buttons are sized to a real touch target (36px / 44px square) with the
 * value on its own padded track, so the − and + never crowd the number.
 */
export default function QuantityStepper({
  quantity,
  onChange,
  size = "md",
  min = 1,
  max = MAX_CART_QUANTITY,
  label,
}: {
  quantity: number;
  onChange: (next: number) => void;
  size?: Size;
  min?: number;
  max?: number;
  label?: string;
}) {
  const button =
    size === "sm"
      ? "h-9 w-9"
      : "h-11 w-11";
  const value = size === "sm" ? "w-9 text-sm" : "w-12 text-base";
  const icon = size === "sm" ? 14 : 16;

  const canDecrease = quantity > min;
  const canIncrease = quantity < max;

  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-lg border border-[#E7DFD6] bg-white"
      role="group"
      aria-label={label ?? "Quantity"}
    >
      <button
        type="button"
        onClick={() => canDecrease && onChange(quantity - 1)}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
        className={`${button} flex shrink-0 items-center justify-center text-dark transition-colors hover:bg-[#FDF6ED] active:bg-[#F5E6D3] disabled:cursor-not-allowed disabled:text-[#D6CCC0] disabled:hover:bg-transparent`}
      >
        <Minus size={icon} strokeWidth={2.5} />
      </button>

      <span
        aria-live="polite"
        className={`${value} shrink-0 border-x border-[#E7DFD6] py-1 text-center font-lato font-semibold text-dark`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => canIncrease && onChange(quantity + 1)}
        disabled={!canIncrease}
        aria-label="Increase quantity"
        className={`${button} flex shrink-0 items-center justify-center text-dark transition-colors hover:bg-[#FDF6ED] active:bg-[#F5E6D3] disabled:cursor-not-allowed disabled:text-[#D6CCC0] disabled:hover:bg-transparent`}
      >
        <Plus size={icon} strokeWidth={2.5} />
      </button>
    </div>
  );
}
