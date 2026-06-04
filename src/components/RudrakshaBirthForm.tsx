"use client";
import Image from "next/image";
import { useState } from "react";

export default function RudrakshaBirthForm() {
  const [timeNotSure, setTimeNotSure] = useState(false);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "540px" }}>

      {/* Background image */}
      <Image
        src="/images/Product Highlight.png"
        alt="Rudraksha journey"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "70px", paddingRight: "70px" }}
      >
        {/* Title */}
        <h2
          className="font-prata text-white"
          style={{ fontSize: "36px", lineHeight: "140%", letterSpacing: "-0.02em", margin: "0 0 10px 0" }}
        >
          Your Rudraksha Journey Begins Here!
        </h2>

        {/* Subtitle */}
        <p
          className="font-lato text-white"
          style={{ fontSize: "13px", lineHeight: "150%", margin: "0 0 28px 0", opacity: 0.85 }}
        >
          Enter your birth details to unlock cosmic insights
        </p>

        {/* Form container */}
        <div
          style={{
            display: "inline-flex",
            border: "1px solid rgba(255,255,255,0.5)",
            padding: "28px 32px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(4px)",
            width: "fit-content",
            marginBottom: "40px",
            gap: "0",
          }}
        >
          {/* Full Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingRight: "28px" }}>
            <label className="font-lato text-white" style={{ fontSize: "13px", fontWeight: 400, lineHeight: "150%" }}>
              Full Name*
            </label>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                border: "1px solid rgba(255,255,255,0.5)",
                padding: "12px 16px",
                width: "280px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.7 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="font-lato bg-transparent outline-none text-white placeholder:text-white/50 w-full"
                style={{ fontSize: "13px", lineHeight: "150%", border: "none" }}
              />
            </div>
          </div>

          {/* Date Of Birth */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingRight: "28px", paddingLeft: "0" }}>
            <label className="font-lato text-white" style={{ fontSize: "13px", fontWeight: 400, lineHeight: "150%" }}>
              Date Of Birth*
            </label>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                border: "1px solid rgba(255,255,255,0.5)",
                padding: "12px 16px",
                width: "280px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.7 }}>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                className="font-lato bg-transparent outline-none text-white placeholder:text-white/50 w-full"
                style={{ fontSize: "13px", lineHeight: "150%", border: "none" }}
              />
            </div>
          </div>

          {/* Time Of Birth */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label className="font-lato text-white" style={{ fontSize: "13px", fontWeight: 400, lineHeight: "150%" }}>
              Time Of Birth*
            </label>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                border: "1px solid rgba(255,255,255,0.5)",
                padding: "12px 16px",
                width: "280px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.7 }}>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <input
                type="text"
                placeholder="--:--"
                disabled={timeNotSure}
                className="font-lato bg-transparent outline-none text-white placeholder:text-white/50 w-full"
                style={{ fontSize: "13px", lineHeight: "150%", border: "none", opacity: timeNotSure ? 0.4 : 1 }}
              />
            </div>

            {/* Time Not Sure */}
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
            >
              {/* Custom checkbox */}
              <div
                onClick={() => setTimeNotSure(!timeNotSure)}
                style={{
                  width: "16px", height: "16px", flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.7)",
                  background: timeNotSure ? "rgba(255,255,255,0.2)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {timeNotSure && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span
                className="font-lato text-white"
                style={{ fontSize: "14px", lineHeight: "150%", opacity: 0.85, cursor: "pointer" }}
                onClick={() => setTimeNotSure(!timeNotSure)}
              >
                Time Not Sure
              </span>
            </label>
          </div>
        </div>

        {/* CTA */}
        <button
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            paddingBottom: "8px",
            borderBottom: "1px solid rgba(255,255,255,0.7)",
            width: "fit-content",
            background: "none",
            border: "none",
            borderBottom: "1px solid rgba(255,255,255,0.7)",
            cursor: "pointer",
            padding: "0 0 8px 0",
          }}
          className="group/cta"
        >
          <span
            className="font-lato text-white group-hover/cta:opacity-75 transition-opacity"
            style={{ fontSize: "14px", fontWeight: 700, lineHeight: "150%", letterSpacing: "0.08em" }}
          >
            FIND THE RIGHT RUDRAKSHA
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover/cta:opacity-75 transition-opacity">
            <path d="M17 7L7 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H17V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </section>
  );
}
