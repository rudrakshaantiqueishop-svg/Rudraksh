import Image from "next/image";

const benefits = [
  "Understand which Rudraksha or gemstone aligns with your birth chart",
  "Avoid selecting beads or stones that may not suit your planetary influences",
  "Learn the traditional significance of different Mukhi Rudraksha",
  "Receive guidance based on astrology rather than market trends",
  "Ask questions about authenticity, usage, and combinations",
  "Make a considered decision instead of relying on assumptions",
];

export default function WhyConsultationMatters() {
  return (
    <section className="section-pad bg-[#FEF9F2]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-7xl mx-auto w-full">

        {/* Left column – text */}
        <div className="flex-1 flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <h2 className="font-prata title-fluid" style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              Why Consultation Matters
            </h2>
            <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
              Choosing a Rudraksha or gemstone without guidance can sometimes lead to confusion or mismatched selections. A consultation helps bring clarity through informed analysis. A consultation helps you:
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {benefits.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <Image src="/assets/icons/Star 1.svg" alt="Star" width={18} height={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                <span className="font-lato" style={{ fontSize: "15px", lineHeight: "150%", color: "#44403C" }}>{item}</span>
              </div>
            ))}
          </div>

          <p className="font-lato" style={{ fontSize: "16px", color: "#44403C", lineHeight: "150%", margin: 0 }}>
            Our goal is not to push a product, but to help you understand what is appropriate for you.
          </p>

        </div>

        {/* Right column – overlapping images */}
        <div className="shrink-0 w-full max-w-[480px] h-[613px] relative hidden lg:block">
          {/* Top-right image */}
          <div className="absolute right-0 top-0 w-[390px] h-[403px] overflow-hidden">
            <Image src="/assets/images/about/about-founding-1.png" alt="Traditional ritual" fill sizes="390px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div className="absolute left-0 bottom-0 w-[390px] h-[403px] overflow-hidden">
            <Image src="/assets/images/about/about-founding-2.png" alt="Festive Rudraksha wearer" fill sizes="390px" style={{ objectFit: "cover" }} />
          </div>
        </div>
        
        {/* Mobile fallback for overlapping images */}
        <div className="shrink-0 w-full max-w-[390px] h-[500px] relative lg:hidden mx-auto">
          <div className="absolute right-0 top-0 w-[300px] h-[310px] overflow-hidden">
            <Image src="/assets/images/about/about-founding-1.png" alt="Traditional ritual" fill sizes="300px" style={{ objectFit: "cover" }} />
          </div>
          <div className="absolute left-0 bottom-0 w-[300px] h-[310px] overflow-hidden">
            <Image src="/assets/images/about/about-founding-2.png" alt="Festive Rudraksha wearer" fill sizes="300px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
