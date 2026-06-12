import Image from "next/image";
import Link from "next/link";

export default function OriginSourcing() {
  return (
    <section className="relative h-[340px] lg:h-[420px] overflow-hidden">
      <Image src="/assets/images/about/about-founding-2.png" alt="Origin & Sourcing" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-4">
        <h2 className="font-prata text-2xl lg:text-[32px] text-white m-0">Origin &amp; Sourcing</h2>
        <p className="font-lato text-sm text-white/85 max-w-2xl m-0 leading-relaxed">
          Our Rudraksha are sourced through established, responsible channels with a focus on authenticity,
          traceability, and ethical handling. We prioritize long-term sourcing relationships over volume.
        </p>
        <Link href="/authenticity" className="inline-flex items-center gap-2 font-lato text-xs font-bold tracking-[0.8px] text-white border-b border-white pb-1">
          EXPLORE MORE
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
