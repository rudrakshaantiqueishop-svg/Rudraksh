"use client";

import { useState } from "react";
import { initiateCheckout } from "@/app/actions/checkout";

export default function PayWithRazorpayButton({ addressId }: { addressId: string | null }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (isProcessing) return;

    if (!addressId) {
      setError("Please select a shipping address.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await initiateCheckout(addressId);
      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={isProcessing}
        onClick={handlePayment}
        className="w-full text-center bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing ? "PROCESSING..." : "PAY WITH RAZORPAY"}
      </button>
      {error && <p className="font-lato text-xs text-red-600 m-0">{error}</p>}
    </div>
  );
}
