import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionLoading() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      {/* Listing Skeleton */}
      <section className="h-px-section py-16 lg:py-24">
        {/* Title area skeleton */}
        <div className="flex flex-col items-center gap-4 mb-12">
           <Skeleton className="h-10 w-64" />
           <Skeleton className="h-4 w-96 max-w-full" />
        </div>

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
