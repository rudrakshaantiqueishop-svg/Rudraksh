import Image from "next/image";

export default function ConsultationHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(500px, 80vw, 780px)" }}>
      <Image
        src="/assets/images/common/comman banner.png"
        alt="Personalized Guidance, Rooted in Clarity"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
        loading="eager"
      />
      
      <div
        className="absolute flex flex-col left-5 right-5 bottom-8 lg:left-16 lg:bottom-[140px] lg:w-[686px] lg:right-auto"
        style={{ gap: "clamp(24px, 3vw, 40px)" }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(12px, 1.5vw, 16px)" }}>
          <h1
            className="font-prata text-white"
            style={{ fontSize: "clamp(46px, 11.5vw, 72px)", lineHeight: "115%", letterSpacing: "-0.02em", margin: 0 }}
          >
            Personalized Guidance,<br />Rooted in Clarity
          </h1>
          <p
            className="font-lato text-white"
            style={{ fontSize: "clamp(15px, 4vw, 18px)", lineHeight: "160%", margin: 0, opacity: 0.95 }}
          >
            Choosing a Rudraksha or gemstone is not a rushed decision.
            If you prefer clarity before selection, our consultation service offers structured guidance based on your birth details and individual context.
          </p>
        </div>

        <a
          href="#"
          className="flex items-center w-fit no-underline"
          style={{ gap: "4px", paddingBottom: "8px", borderBottom: "1px solid white" }}
        >
          <span className="font-lato text-white" style={{ fontSize: "clamp(14px, 3vw, 16px)", fontWeight: 600, lineHeight: "150%", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            BOOK CONSULTATION
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
