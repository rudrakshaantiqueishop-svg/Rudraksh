import Image from "next/image";

const includes = [
  "Personalized Rudraksha recommendation",
  "15-minute call with astrologer",
  "Birth chart insights relevant to selection",
  "Wearing and mantra guidance",
];

export default function WhatTheConsultationIncludes() {
  return (
    <section className="section-pad bg-[#FEF9F2]">
      <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto gap-12 lg:gap-16 w-full">

        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-6">

            <h2 className="font-prata title-fluid" style={{ lineHeight: "140%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              What the Consultation Includes
            </h2>

            <div className="flex flex-col gap-[14px]">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <Image src="/assets/icons/Star 1.svg" alt="Star" width={18} height={18} className="shrink-0 mt-[2px]" />
                  <span className="font-lato text-[15px] md:text-[16px] font-medium text-[#44403C]">{item}</span>
                </div>
              ))}
            </div>

            <p className="font-lato text-[15px] md:text-[16px] text-[#44403C] leading-[150%] m-0">
              Consultation Fee: ₹1000 (fully redeemable with purchase).
            </p>

            <div className="flex flex-row items-center gap-6 lg:gap-8 flex-wrap mt-4">
              <a
                href="#"
                className="font-lato inline-flex items-center gap-[6px] text-[#0B0404] text-[13px] md:text-[14px] font-semibold tracking-[0.08em] uppercase no-underline pb-[6px] border-b border-[#0B0404]"
              >
                BOOK CONSULTATION
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a
                href="#"
                className="font-lato inline-flex items-center gap-2 text-[#25D366] text-[13px] font-semibold tracking-[0.04em] no-underline"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 0 1-4.07-1.11l-.29-.17-3.01.79.8-2.93-.19-.3A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.36-5.96c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.18 1.09.16 1.5.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
                </svg>
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>
        </div>

        {/* Right column – images */}
        <div className="shrink-0 w-full max-w-[600px] aspect-[600/580] relative mt-10 lg:mt-0 mx-auto">
          {/* Decorative gradient border rectangle */}
          <div className="absolute left-[12.5%] top-[20.7%] w-[75%] h-[58.6%] z-0" style={{
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }} />
          {/* Top-right image */}
          <div className="absolute right-0 top-0 w-[79%] h-[44.5%] overflow-hidden z-10">
            <Image src="/assets/images/about/about-sacred-1.png" alt="Rudraksha mala on stone" fill sizes="(max-width: 768px) 79vw, 475px" style={{ objectFit: "cover" }} />
          </div>
          {/* Bottom-left image */}
          <div className="absolute left-0 bottom-0 w-[79%] h-[44.5%] overflow-hidden z-10">
            <Image src="/assets/images/about/about-sacred-2.png" alt="Mala with floral branch" fill sizes="(max-width: 768px) 79vw, 475px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
