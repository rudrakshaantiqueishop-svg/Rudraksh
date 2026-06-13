import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <section className="h-px-section py-8 lg:py-10">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <span className="text-gray-text">›</span>
          <Skeleton className="h-4 w-20" />
          <span className="text-gray-text">›</span>
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Gallery Skeleton */}
          <div className="flex flex-col gap-3">
            <Skeleton className="relative aspect-square overflow-hidden" />
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-[330px_1fr] lg:grid-rows-2 lg:h-[576px]">
              <Skeleton className="order-1 relative overflow-hidden aspect-square lg:aspect-auto lg:row-span-2" />
              <Skeleton className="order-3 col-span-2 relative overflow-hidden aspect-[16/9] lg:order-2 lg:col-span-1 lg:aspect-auto" />
              <Skeleton className="order-2 relative overflow-hidden aspect-square lg:order-3 lg:aspect-auto" />
            </div>
            
            {/* Trust badges skeleton */}
            <div className="flex items-center justify-between flex-wrap gap-4 mt-3 pt-1">
               <Skeleton className="h-4 w-full max-w-[400px]" />
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="flex flex-col gap-5">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-24" />
            <div className="border-t border-[#E7DFD6]" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-16 w-full mt-4" />
            <Skeleton className="h-24 w-full mt-4" />
            
            <div className="flex gap-3 mt-4">
               <Skeleton className="h-12 w-24" />
               <Skeleton className="h-12 flex-1" />
            </div>
            
            <Skeleton className="h-12 w-full" />
            
            <div className="border-t border-[#E7DFD6] mt-4" />
            
            {/* Accordions skeleton */}
            <div className="flex flex-col">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="py-4 h-14 mt-1 border-b border-[#E7DFD6] rounded-none" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
