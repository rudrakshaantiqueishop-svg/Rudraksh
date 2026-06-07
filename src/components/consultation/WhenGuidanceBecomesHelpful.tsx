import Image from "next/image";

const helpfulIf = [
  "A first-time buyer unsure where to begin",
  "Seeking birth chart–based selection",
  "Choosing the right Mukhi for specific intentions",
  "Considering combinations of Rudraksha or gemstones",
  "Clarifying authenticity-related concerns",
  "Seeking spiritual alignment rather than impulse purchase",
];

export default function WhenGuidanceBecomesHelpful() {
  return (
    <section className="section-pad bg-[#FEF9F2]">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto w-full">

        {/* Left column – decorative photo */}
        <div className="shrink-0 w-full max-w-[560px] aspect-[560/590] relative mx-auto order-2 lg:order-1">
          {/* Top-left outline rectangle */}
          <div className="absolute left-0 top-0 w-[63%] h-[65%] border-[3px] border-[#552912] z-0" />
          {/* Bottom-right outline rectangle */}
          <div className="absolute right-0 bottom-0 w-[63%] h-[65%] border-[3px] border-[#BB5A28] z-0" />
          {/* Photo */}
          <div className="absolute left-[12.5%] top-[10%] w-[82%] h-[80%] overflow-hidden z-10">
            <Image src="/assets/images/about/about-sacred-1.png" alt="A moment of guided practice" fill sizes="(max-width: 768px) 82vw, 458px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Right column – text */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full order-1 lg:order-2">

          <div className="flex flex-col gap-2">
            <h2 className="font-prata title-fluid" style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              When Guidance Becomes Helpful
            </h2>
            <p className="font-lato text-[15px] md:text-[16px] text-[#44403C] leading-[150%] m-0">
              A consultation may be valuable if you are:
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {helpfulIf.map((item) => (
              <div key={item} className="flex items-start gap-[14px]">
                <Image src="/assets/icons/Star 1.svg" alt="Star" width={16} height={16} className="shrink-0 mt-[2px]" />
                <span className="font-lato text-[14px] md:text-[15px] leading-[150%] text-[#44403C]">{item}</span>
              </div>
            ))}
          </div>

          <p className="font-lato text-[14px] md:text-[15px] text-[#44403C] leading-[160%] m-0">
            Not every purchase requires consultation. But when clarity is needed, structured guidance helps avoid confusion.
          </p>

        </div>

      </div>
    </section>
  );
}
