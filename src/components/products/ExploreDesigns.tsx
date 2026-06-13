import Image from "next/image";
import type { CategoryPageContent } from "@/lib/product-utils";

export default function ExploreDesigns({ pageContent }: { pageContent: CategoryPageContent }) {
  const { heading, description, items } = pageContent.exploreDesigns;

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="font-prata text-3xl lg:text-[34px] font-normal text-dark m-0">
          {heading}
        </h2>
        <p className="font-lato text-sm text-gray-text m-0">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((d, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden bg-[#F0E8DD]">
              <Image
                src={d.image}
                alt={d.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-center">
              <h3 className="font-prata text-xl font-normal text-dark m-0">{d.title}</h3>
              <p className="font-lato text-sm text-gray-text m-0">{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
