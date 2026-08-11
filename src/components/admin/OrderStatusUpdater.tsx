"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { updateFulfillmentStatus } from "@/app/actions/admin-orders";
import { FULFILLMENT_STEPS, CANCELLED_STEP, fulfillmentStepIndex } from "@/lib/orders";
import type { FulfillmentStatus } from "@/generated/prisma/client";

/**
 * The admin's one job on an order: move it along the shipping journey. Rendered
 * as big labelled buttons rather than a dropdown so the next step is obvious.
 */
export default function OrderStatusUpdater({
  orderId,
  current,
  disabled = false,
}: {
  orderId: string;
  current: FulfillmentStatus;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<FulfillmentStatus | null>(null);

  const currentIndex = fulfillmentStepIndex(current);
  const isCancelled = current === "CANCELLED";

  const apply = (status: FulfillmentStatus) => {
    setError(null);
    startTransition(async () => {
      const result = await updateFulfillmentStatus(orderId, status, note);
      if (result.success) {
        setNote("");
        setSavedStatus(status);
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  };

  if (disabled) {
    return (
      <p className="rounded-md bg-amber-50 px-3 py-2 font-lato text-xs text-amber-900">
        This order hasn&apos;t been paid for, so it can&apos;t be shipped yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {FULFILLMENT_STEPS.map((step, index) => {
          const isDone = !isCancelled && index <= currentIndex;
          const isNext = !isCancelled && index === currentIndex + 1;

          return (
            <button
              key={step.value}
              type="button"
              onClick={() => apply(step.value)}
              disabled={isPending || (isDone && index === currentIndex)}
              className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors disabled:cursor-default ${
                isDone
                  ? "border-emerald-200 bg-emerald-50"
                  : isNext
                    ? "border-brown bg-white hover:bg-[#FAF6F1]"
                    : "border-[#E7DFD6] bg-white hover:bg-stone-50"
              }`}
            >
              <span className="flex flex-col">
                <span
                  className={`font-lato text-sm ${isDone ? "font-semibold text-emerald-900" : "text-dark"}`}
                >
                  {step.label}
                </span>
                <span className="font-lato text-xs text-gray-text">
                  {index === currentIndex
                    ? "Current status"
                    : isNext
                      ? "Mark as this next"
                      : isDone
                        ? "Already done"
                        : "Skip ahead to this"}
                </span>
              </span>
              {isDone && <Check size={18} className="shrink-0 text-emerald-700" />}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="status-note" className="font-lato text-xs text-gray-text">
          Add a note for the customer (optional) — e.g. a courier name or tracking number
        </label>
        <input
          id="status-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Shipped via BlueDart, tracking 1234567890"
          className="h-10 w-full rounded-md border border-input bg-white px-3 font-lato text-sm text-dark"
        />
        <p className="font-lato text-[11px] text-gray-text">
          The note is attached to the next status you set above and shown on the customer&apos;s
          tracking page.
        </p>
      </div>

      {!isCancelled && (
        <button
          type="button"
          onClick={() => {
            if (confirm("Cancel this order? The customer will see it as cancelled.")) {
              apply(CANCELLED_STEP.value);
            }
          }}
          disabled={isPending}
          className="self-start font-lato text-xs text-red-600 underline underline-offset-2 disabled:opacity-50"
        >
          Cancel this order
        </button>
      )}

      {isPending && <p className="font-lato text-xs text-gray-text">Saving…</p>}
      {savedStatus && !isPending && !error && (
        <p className="font-lato text-xs text-emerald-700">Status updated. The customer can see it now.</p>
      )}
      {error && <p className="font-lato text-xs text-destructive">{error}</p>}
    </div>
  );
}
