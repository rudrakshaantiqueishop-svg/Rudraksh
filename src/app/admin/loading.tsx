import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Title & Header Action Skeletons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-44 rounded-xl" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Horizontally Scrollable Filter Tabs Skeletons */}
      <div className="flex items-center gap-2 overflow-hidden pb-1">
        <Skeleton className="h-9 w-28 rounded-full shrink-0" />
        <Skeleton className="h-9 w-32 rounded-full shrink-0" />
        <Skeleton className="h-9 w-28 rounded-full shrink-0" />
        <Skeleton className="h-9 w-36 rounded-full shrink-0" />
        <Skeleton className="h-9 w-24 rounded-full shrink-0" />
      </div>

      {/* Mobile Card Grid Loading Skeletons (< md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs"
          >
            <div className="flex items-start gap-3.5">
              <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <div className="flex gap-2 mt-1">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-12 rounded-lg" />
                <Skeleton className="h-6 w-6 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View Loading Skeleton (>= md) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs">
        <div className="border-b border-stone-100 bg-stone-50/60 p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-4 w-28 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
        </div>
        <div className="divide-y divide-stone-100 p-4 flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-48 rounded-lg" />
                  <Skeleton className="h-3 w-28 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-lg" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-12 rounded-lg" />
                <Skeleton className="h-7 w-7 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
