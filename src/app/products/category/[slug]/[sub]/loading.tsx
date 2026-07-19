import { Skeleton } from "@/components/ui/skeleton";

export default function SubcategoryLoading() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      {/* Breadcrumb + title */}
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6">
        <Skeleton className="h-3 w-64" />
        <Skeleton className="mt-4 h-8 w-72" />
        <Skeleton className="mt-2 h-4 w-40" />
      </div>

      {/* Sidebar + grid */}
      <section className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <Skeleton className="h-9 w-28 rounded" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 flex-col gap-6 lg:flex">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            {/* Toggle rows */}
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-4 w-32" />
              ))}
            </div>
            {/* Facet groups */}
            {[1, 2, 3].map((g) => (
              <div key={g} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-4 hidden lg:flex">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
