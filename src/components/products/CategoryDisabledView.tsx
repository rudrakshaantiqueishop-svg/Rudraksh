import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldAlert } from "lucide-react";

interface CategoryDisabledViewProps {
  categoryName: string;
  categoryImage?: string;
  otherCategories?: Array<{ id: string; name: string; slug: string; image: string }>;
}

export default function CategoryDisabledView({
  categoryName,
  categoryImage = "/assets/images/about/about-sacred-1.png",
  otherCategories = [],
}: CategoryDisabledViewProps) {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }} className="min-h-screen py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-[#E7DBCC] shadow-xl p-8 sm:p-12 text-center flex flex-col items-center">
          {/* Subtle Golden Accent Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

          {/* Sacred Notice Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF6ED] border border-[#E6D4BE] text-[#552912] font-lato text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} className="text-[#9A461A]" />
            <span>Sacred Collection Notice</span>
          </div>

          {/* Hero Sacred Asset Image Frame */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#F3E5D4] shadow-md mb-8 bg-stone-100">
            <Image
              src={categoryImage || "/assets/images/about/about-sacred-1.png"}
              alt={categoryName}
              fill
              className="object-cover"
              unoptimized={categoryImage.startsWith("http")}
            />
          </div>

          {/* Main Title */}
          <h1 className="font-prata text-3xl sm:text-4xl lg:text-5xl text-[#0B0404] mb-4 leading-tight">
            {categoryName} is Currently Paused
          </h1>

          {/* Descriptive Message */}
          <p className="font-lato text-stone-600 max-w-2xl text-base sm:text-lg leading-relaxed mb-8">
            Our traditional priests and authentic artisans are currently preparing the next sacred energization batch for the{" "}
            <strong className="text-[#552912] font-semibold">{categoryName}</strong> collection. We are temporarily not accepting new orders for this specific category.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#552912] text-white font-lato text-sm font-semibold tracking-wider hover:bg-[#3D1D0D] transition-all shadow-md"
            >
              <span>EXPLORE ALL PRODUCTS</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-[#552912] text-[#552912] font-lato text-sm font-semibold tracking-wider hover:bg-[#552912] hover:text-white transition-all"
            >
              <span>BOOK A CONSULTATION</span>
            </Link>
          </div>
        </div>

        {/* Alternative Categories Section */}
        {otherCategories.length > 0 && (
          <div className="mt-16 text-center">
            <h2 className="font-prata text-2xl sm:text-3xl text-[#0B0404] mb-2">
              Explore Other Sacred Collections
            </h2>
            <p className="font-lato text-sm text-stone-500 mb-8">
              Discover authentic lab-certified Rudrakshas, mala beads, and energized items.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherCategories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/category/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-[#E7DBCC] bg-white p-2.5 pb-4 text-center hover:shadow-xl hover:border-[#D4C3AD] transition-all"
                >
                  <div className="relative h-48 sm:h-52 lg:h-56 w-full overflow-hidden rounded-xl bg-stone-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized={cat.image.startsWith("http")}
                    />
                  </div>
                  <h3 className="mt-3.5 font-prata text-lg sm:text-xl text-[#0B0404] group-hover:text-[#552912] transition-colors font-medium">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
