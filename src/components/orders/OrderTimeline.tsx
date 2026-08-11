"use client";

import { Check, X, Clock, PackageCheck, Truck, MapPin } from "lucide-react";
import {
  FULFILLMENT_STEPS,
  fulfillmentStepIndex,
  formatOrderDateTime,
} from "@/lib/orders";
import type { FulfillmentStatus } from "@/generated/prisma/client";

type Event = { status: FulfillmentStatus; note: string | null; createdAt: Date };

const stepIcons: Record<string, typeof Check> = {
  UNFULFILLED: PackageCheck,
  PROCESSING: Clock,
  SHIPPED: Truck,
  DELIVERED: MapPin,
};

export default function OrderTimeline({
  status,
  events,
}: {
  status: FulfillmentStatus;
  events: Event[];
}) {
  if (status === "CANCELLED") {
    const cancelledAt = events.find((e) => e.status === "CANCELLED");
    return (
      <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
        <X size={20} className="mt-0.5 shrink-0 text-red-700" />
        <div>
          <p className="font-lato text-sm font-bold text-red-900">This order was cancelled</p>
          {cancelledAt && (
            <p className="font-lato text-xs text-red-700 mt-1">
              {formatOrderDateTime(cancelledAt.createdAt)}
              {cancelledAt.note ? ` — ${cancelledAt.note}` : ""}
            </p>
          )}
        </div>
      </div>
    );
  }

  const currentIndex = fulfillmentStepIndex(status);

  return (
    <div className="w-full">
      {/* Desktop Horizontal Progress Bar (sm and larger) */}
      <div className="hidden sm:block py-2">
        <div className="grid grid-cols-4 gap-2 relative">
          {/* Connecting Line Behind Steps */}
          <div className="absolute top-5 left-[12.5%] right-[12.5%] h-1 bg-stone-200 -z-0">
            <div
              className="h-full bg-emerald-600 transition-all duration-500"
              style={{
                width: `${(Math.min(currentIndex, 3) / 3) * 100}%`,
              }}
            />
          </div>

          {FULFILLMENT_STEPS.map((step, index) => {
            const reached = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const event = events.find((e) => e.status === step.value);
            const Icon = stepIcons[step.value] || Check;

            return (
              <div key={step.value} className="flex flex-col items-center text-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                    reached
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-stone-300 bg-white text-stone-400"
                  } ${isCurrent ? "ring-4 ring-emerald-100 ring-offset-2 scale-110" : ""}`}
                >
                  {reached ? <Check size={18} strokeWidth={2.5} /> : <Icon size={18} />}
                </div>

                <div className="mt-3 flex flex-col items-center">
                  <span
                    className={`font-lato text-xs font-bold ${
                      reached ? "text-[#0B0404]" : "text-stone-400"
                    }`}
                  >
                    {step.label}
                  </span>

                  {event ? (
                    <span className="font-lato text-[11px] text-emerald-800 font-medium mt-0.5">
                      {formatOrderDateTime(event.createdAt)}
                    </span>
                  ) : (
                    <span className="font-lato text-[11px] text-stone-500 mt-0.5">
                      {reached ? step.customerHint : "Upcoming"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline (< sm screen) */}
      <ol className="flex sm:hidden flex-col gap-0 py-1">
        {FULFILLMENT_STEPS.map((step, index) => {
          const reached = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const event = events.find((e) => e.status === step.value);
          const isLast = index === FULFILLMENT_STEPS.length - 1;

          return (
            <li key={step.value} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    reached
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                      : "border-stone-300 bg-white text-stone-300"
                  } ${isCurrent ? "ring-4 ring-emerald-100" : ""}`}
                >
                  {reached ? <Check size={16} strokeWidth={2.5} /> : <Clock size={16} />}
                </span>
                {!isLast && (
                  <span
                    className={`w-0.5 flex-1 ${index < currentIndex ? "bg-emerald-600" : "bg-stone-200"}`}
                    style={{ minHeight: 36 }}
                  />
                )}
              </div>

              <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                <p
                  className={`font-lato text-sm font-bold leading-tight ${
                    reached ? "text-[#0B0404]" : "text-stone-400"
                  }`}
                >
                  {step.label}
                </p>

                {event ? (
                  <p className="font-lato text-xs text-emerald-800 font-medium mt-1">
                    {formatOrderDateTime(event.createdAt)}
                    {event.note ? ` — ${event.note}` : ""}
                  </p>
                ) : (
                  <p className="font-lato text-xs text-stone-500 mt-1 leading-normal">
                    {reached ? step.customerHint : "Upcoming step"}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
