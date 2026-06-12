import Image from "next/image";
import Link from "next/link";

export default function NeedGuidance() {
  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="relative h-[300px] lg:h-[380px] overflow-hidden">
        <Image src="/assets/images/products/category-bracelets.png" alt="Need Guidance?" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 lg:px-14 gap-3 max-w-md">
          <h2 className="font-prata text-2xl lg:text-[32px] text-white m-0">Need Guidance?</h2>
          <p className="font-lato text-sm text-white/85 m-0 leading-relaxed">
            If you&apos;re unsure whether this Rudraksha aligns with your intention or practice, our experts can help
            you decide—without obligation to purchase.
          </p>
          <Link href="/consultation" className="inline-flex items-center gap-2 font-lato text-xs font-bold tracking-[0.8px] text-white border-b border-white pb-1">
            ASK AN EXPERT
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
