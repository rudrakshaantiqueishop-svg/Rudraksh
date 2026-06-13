import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/products";

export default async function ShopByPurpose() {
  const collections = await getCollections();

  return (
    <section className="h-px-section py-[60px] lg:py-[80px]" style={{ background: "#FEF9F2", borderTop: "1px solid rgba(0,0,0,0.06)" }}>

      {/* Title */}
      <h2
        className="font-prata"
        style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: "0 0 56px 0" }}
      >
        Shop By Purpose
      </h2>

      {/* Icons row */}
      <div className="flex lg:grid lg:grid-cols-8 gap-6 lg:gap-0 overflow-x-auto no-scrollbar pb-2 lg:pb-0 lg:overflow-x-visible" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/products/collection/${c.slug}`}
            className="group/purpose flex flex-col items-center gap-3 no-underline flex-shrink-0 lg:flex-shrink"
            style={{ scrollSnapAlign: "start", minWidth: "80px", textDecoration: "none" }}
          >
            {/* Icon */}
            <div className="flex items-center justify-center" style={{ width: "clamp(52px,8vw,80px)", height: "clamp(52px,8vw,80px)" }}>
              <Image
                src={c.icon}
                alt={c.name}
                width={72}
                height={72}
                style={{ objectFit: "contain" }}
                className="group-hover/purpose:opacity-70 transition-opacity duration-200"
              />
            </div>
            {/* Label */}
            <span
              className="font-lato group-hover/purpose:text-[#BB5A28] transition-colors duration-200"
              style={{ fontSize: "clamp(11px,1.3vw,16px)", fontWeight: 400, lineHeight: "150%", color: "#44403C", textAlign: "center" }}
            >
              {c.name}
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}
