import Image from "next/image";

export default function InPersonGuidanceAvailable() {
  return (
    <section className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
      <Image
        src="/assets/images/common/comman banner.png"
        alt="In-Person Guidance Available"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        loading="lazy"
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      <div className="absolute inset-0 flex items-center justify-center md:justify-start p-6 md:px-[64px] text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-6 md:gap-8 w-full max-w-[650px]">
          <div className="flex flex-col gap-2">
            <h2 className="font-prata title-fluid text-white m-0">
              In-Person Guidance Available
            </h2>
            <p className="font-lato text-[14px] md:text-[16px] leading-[160%] text-[#E7E5E4] m-0">
              You may also visit our physical store in Rishikesh for consultation by prior appointment. Being near the banks of the Ganga, our space is designed for focused discussions rather than hurried transactions.
            </p>
          </div>
          <a href="#consultation-form" className="inline-flex items-center gap-[6px] text-white font-lato text-[14px] md:text-[16px] font-medium tracking-[0.06em] uppercase no-underline pb-2 border-b border-white/60 w-fit">
            BOOK IN-STORE APPOINTMENT
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
