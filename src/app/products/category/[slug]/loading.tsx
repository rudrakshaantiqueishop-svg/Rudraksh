import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      {/* Hero Skeleton */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <Skeleton className="h-10 w-3/4 max-w-2xl mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl" />
          <Skeleton className="h-6 w-2/3 max-w-2xl mt-2" />
        </div>
      </section>

      {/* Intro Skeleton */}
      <section className="h-px-section py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-10 w-2/3" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-[20px]">
             <Skeleton className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* Listing Skeleton */}
      <section className="h-px-section py-12">
        {/* Filters/Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
             <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
             <div key={i} className="flex flex-col gap-4">
               <Skeleton className="w-full aspect-[4/5] rounded-[20px]" />
               <Skeleton className="h-5 w-3/4" />
               <Skeleton className="h-5 w-1/2" />
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
