"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { initiateCheckout, verifyRazorpayPayment, abandonCheckout } from "@/app/actions/checkout";
import OrderSuccessModal from "@/components/checkout/OrderSuccessModal";

type RazorpayInstance = { open: () => void };
type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const SDK_SRC = "https://checkout.razorpay.com/v1/checkout.js";

// One shared load across the page — the effect warms it on mount, and the click
// handler awaits the same promise so a slow network delays the click instead of
// leaving the button dead.
let sdkPromise: Promise<void> | null = null;

function loadRazorpaySdk(): Promise<void> {
  if (typeof window === "undefined" || window.Razorpay) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SDK_SRC}"]`);
    const script = existing ?? document.createElement("script");

    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => {
      sdkPromise = null;
      reject(new Error("Razorpay SDK failed to load"));
    });

    if (!existing) {
      script.src = SDK_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return sdkPromise;
}

export default function PayWithRazorpayButton({
  addressId,
  customerName,
  customerEmail,
  customerPhone,
}: {
  addressId: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
}) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paidOrder, setPaidOrder] = useState<{ orderId: string; totalCents: number } | null>(null);

  // The customer completed payment but the Razorpay window is still settling —
  // used to keep the button locked so nobody double-pays.
  const settlingRef = useRef(false);

  useEffect(() => {
    // Warm the SDK while the customer is still picking an address.
    void loadRazorpaySdk().catch(() => {});
  }, []);

  const handlePayment = async () => {
    // Already paying, or already paid — never open a second payment window.
    if (isProcessing || paidOrder) return;

    if (!addressId) {
      setError("Please choose a delivery address first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      try {
        await loadRazorpaySdk();
      } catch {
        setError("Could not reach the payment provider. Please check your connection and try again.");
        setIsProcessing(false);
        return;
      }

      if (!window.Razorpay) {
        setError("The payment window could not be opened. Please refresh and try again.");
        setIsProcessing(false);
        return;
      }

      const result = await initiateCheckout(addressId);
      if (!result.success) {
        setError(result.error);
        setIsProcessing(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: result.keyId,
        amount: result.amount,
        currency: result.currency,
        name: "Rudraksh Antiquei",
        description: "Sacred Beads & Gems Order",
        order_id: result.razorpayOrderId,
        prefill: {
          name: customerName ?? "",
          email: customerEmail ?? "",
          contact: customerPhone ?? "",
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          settlingRef.current = true;
          try {
            const verification = await verifyRazorpayPayment({
              orderId: result.orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verification.success) {
              // Stays true: once paid, the dismiss that follows Razorpay
              // closing itself must never be read as an abandoned checkout.
              setPaidOrder({ orderId: verification.orderId, totalCents: verification.totalCents });
              // Refresh so the header cart count drops to zero behind the modal.
              router.refresh();
            } else {
              settlingRef.current = false;
              setError(
                `${verification.error} Your payment reference is ${response.razorpay_payment_id} — please keep it and contact us if you were charged.`
              );
              setIsProcessing(false);
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            // Deliberately left settling: the payment may well have gone
            // through, so this must not be cancelled as an abandoned checkout.
            setError(
              `We couldn't confirm your payment with our server. Your payment reference is ${response.razorpay_payment_id} — please keep it and contact us before paying again.`
            );
            setIsProcessing(false);
          }
        },
        theme: { color: "#552912" },
        modal: {
          ondismiss: function () {
            // Closed without paying — release the pending order so it doesn't
            // linger in the admin list as a live order.
            if (!settlingRef.current) {
              void abandonCheckout(result.orderId);
              setIsProcessing(false);
            }
          },
        },
      });

      razorpay.open();
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      setError("Something went wrong starting the payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={isProcessing || !addressId || paidOrder !== null}
        onClick={handlePayment}
        className="w-full text-center bg-[#552912] hover:bg-[#3D1D0D] text-white font-lato text-sm font-bold tracking-[0.5px] py-3.5 rounded transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
      >
        {isProcessing ? "PROCESSING..." : "PAY SECURELY"}
      </button>

      {!addressId && (
        <p className="font-lato text-xs text-gray-text text-center">
          Choose a delivery address to continue.
        </p>
      )}

      <p className="font-lato text-[11px] text-gray-text text-center">
        Payments are processed securely by Razorpay. Cards, UPI, and net banking accepted.
      </p>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 font-lato text-xs leading-relaxed">
          {error}
        </div>
      )}

      {paidOrder && (
        <OrderSuccessModal orderId={paidOrder.orderId} totalCents={paidOrder.totalCents} />
      )}
    </div>
  );
}
