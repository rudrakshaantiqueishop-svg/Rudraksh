import Image from "next/image";
import Link from "next/link";

const combos = [
  { pair: "5 Mukhi + 6 Mukhi", note: "for balance and discipline" },
  { pair: "5 Mukhi + 7 Mukhi", note: "for grounding and stability" },
  { pair: "5 Mukhi + 8 Mukhi", note: "for balance and discipline" },
  { pair: "5 Mukhi + 9 Mukhi", note: "for grounding and stability" },
];

export default function ExpertRecommendedCombinations() {
  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="shrink-0 w-full max-w-[380px] aspect-[560/590] relative mx-auto lg:mx-0">
          {/* Top-left outline rectangle */}
          <div className="absolute left-0 top-0 w-[63%] h-[65%] border-[3px] border-[#552912] z-0" />
          {/* Bottom-right outline rectangle */}
          <div className="absolute right-0 bottom-0 w-[63%] h-[65%] border-[3px] border-[#BB5A28] z-0" />
          {/* Photo */}
          <div className="absolute left-[12.5%] top-[10%] w-[82%] h-[80%] overflow-hidden z-10">
            <Image
              src="/assets/images/about/about-founding-1.png"
              alt="Expert recommended combinations"
              fill
              sizes="(max-width: 1024px) 82vw, 312px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <h2 className="font-prata text-2xl lg:text-[28px] text-dark m-0">Expert Recommended Combinations</h2>
          <p className="font-lato text-base text-gray-text m-0 leading-relaxed max-w-md">
            In some cases, Rudraksha are traditionally paired for complementary support. These combinations are
            suggested thoughtfully, based on intention—not as upgrades. Check out a few combinations below:
          </p>
          <div className="flex flex-col gap-3">
            {combos.map((c) => (
              <div key={c.pair} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 flex items-center justify-center shrink-0"
                >
                  <Image src="/assets/icons/Star 1.svg" alt="" width={20} height={20} />
                </span>
                <span className="font-lato text-base text-dark">
                  {c.pair} — <span className="text-accent italic">{c.note}</span>
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-lato text-xs font-bold tracking-[0.8px] text-brown border-b border-brown pb-1 w-fit"
          >
            CHECK OUT MORE COMBOS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
