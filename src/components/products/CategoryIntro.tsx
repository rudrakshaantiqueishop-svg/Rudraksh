import Image from "next/image";

export default function CategoryIntro() {
  return (
    <section className="h-px-section py-14 lg:py-20" style={{ background: "#FEF9F2" }}>
      <div className="flex flex-col-reverse sm:flex-row gap-8 lg:gap-12 items-start sm:items-center">
        <div className="hidden sm:block relative w-[240px] h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] shrink-0 border border-[#BB5A28] p-1.5 self-center sm:self-auto">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/assets/images/home/rudraksh.png"
              alt="Rudraksha Beads"
              fill
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 300px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <h2 className="font-prata text-3xl md:text-4xl lg:text-[42px] font-normal text-dark m-0">
            Rudraksha Beads
          </h2>
          <p className="font-lato text-base lg:text-[17px] leading-relaxed text-gray-text m-0">
            Rudraksha beads have been worn for centuries for spiritual grounding, focus, and inner balance.
            However, not every Rudraksha is the same—and choosing the right one depends on authenticity, structure,
            and personal suitability. This collection brings together verified Rudraksha beads, clearly categorized
            by mukhi, origin, and form, so you can make an informed choice without pressure.
          </p>
          <div className="flex items-center gap-8 mt-2">
            <a
              href="/how-to-choose"
              className="inline-flex items-center gap-1.5 text-brown font-lato text-sm lg:text-[15px] font-bold tracking-[0.8px] pb-1 border-b border-brown hover:opacity-70 transition-opacity"
            >
              HOW TO CHOOSE GUIDE
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <a
              href="/consultation"
              className="inline-flex items-center gap-1.5 text-brown font-lato text-sm lg:text-[15px] font-bold tracking-[0.8px] pb-1 border-b border-brown hover:opacity-70 transition-opacity"
            >
              ASK AN EXPERT
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
