import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoading() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-44 rounded-xl" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <Skeleton className="h-5 w-32 rounded-lg" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <div className="flex items-center gap-3 py-2">
              <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
              <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
            </div>
            <div className="flex items-center justify-between border-t border-stone-100 pt-3">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
