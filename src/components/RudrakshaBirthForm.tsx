"use client";
import Image from "next/image";
import { useState } from "react";

const InputBox = ({ icon, placeholder, disabled }: { icon: React.ReactNode; placeholder: string; disabled?: boolean }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: "12px",
    border: "1px solid rgba(255,255,255,0.5)",
    padding: "12px 16px",
    width: "100%",
  }}>
    {icon}
    <input
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      className="font-lato bg-transparent outline-none text-white placeholder:text-white/50 w-full"
      style={{ fontSize: "13px", lineHeight: "150%", border: "none", opacity: disabled ? 0.4 : 1 }}
    />
  </div>
);

export default function RudrakshaBirthForm() {
  const [timeNotSure, setTimeNotSure] = useState(false);

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "clamp(560px, 120vw, 560px)" }}>

      {/* Background image */}
      <Image
        src="/assets/images/products/Product Highlight.png"
        alt="Rudraksha journey"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Content overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-start"
        style={{ padding: "clamp(40px, 8vw, 100px) clamp(16px, 5vw, 70px) 40px" }}
      >
        {/* Title */}
        <h2
          className="font-prata text-white"
          style={{ fontSize: "clamp(24px, 5vw, 36px)", lineHeight: "140%", letterSpacing: "-0.02em", margin: "0 0 10px 0" }}
        >
          Your Rudraksha Journey Begins Here!
        </h2>

        {/* Subtitle */}
        <p
          className="font-lato text-white"
          style={{ fontSize: "13px", lineHeight: "150%", margin: "0 0 24px 0", opacity: 0.85 }}
        >
          Enter your birth details to unlock cosmic insights
        </p>

        {/* Form container */}
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.5)",
            padding: "20px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(4px)",
            width: "100%",
            maxWidth: "900px",
            marginBottom: "28px",
          }}
        >
          {/* Fields — row on desktop, column on mobile */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-0">

            {/* Full Name */}
            <div className="flex flex-col gap-2 lg:pr-7 lg:border-r lg:border-white/25 w-full">
              <label className="font-lato text-white" style={{ fontSize: "13px" }}>Full Name*</label>
              <InputBox
                placeholder="Enter Your Name"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.7 }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                }
              />
            </div>

            {/* Date Of Birth */}
            <div className="flex flex-col gap-2 lg:px-7 lg:border-r lg:border-white/25 w-full">
              <label className="font-lato text-white" style={{ fontSize: "13px" }}>Date Of Birth*</label>
              <InputBox
                placeholder="dd-mm-yyyy"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.7 }}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                }
              />
            </div>

            {/* Time Of Birth */}
            <div className="flex flex-col gap-2 lg:pl-7 w-full">
              <label className="font-lato text-white" style={{ fontSize: "13px" }}>Time Of Birth*</label>
              <InputBox
                placeholder="--:--"
                disabled={timeNotSure}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.7 }}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                }
              />
              {/* Time Not Sure */}
              <div
                className="flex items-center gap-2 mt-1 cursor-pointer select-none"
                onClick={() => setTimeNotSure(!timeNotSure)}
              >
                <div style={{
                  width: "15px", height: "15px", flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.7)",
                  background: timeNotSure ? "rgba(255,255,255,0.2)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {timeNotSure && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-lato text-white" style={{ fontSize: "13px", opacity: 0.85 }}>
                  Time Not Sure
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <button
          className="group/cta flex items-center gap-2 w-fit"
          style={{ background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.7)", padding: "0 0 7px 0", cursor: "pointer" }}
        >
          <span className="font-lato text-white group-hover/cta:opacity-75 transition-opacity" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em" }}>
            FIND THE RIGHT RUDRAKSHA
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover/cta:opacity-75 transition-opacity">
            <path d="M17 7L7 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </section>
  );
}
