"use client";

import { useState } from "react";
import Image from "next/image";

const contactItems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 6.5C2 5.67 2.67 5 3.5 5h17c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-17C2.67 19 2 18.33 2 17.5v-11z" stroke="#BB5A28" strokeWidth="1.5" />
        <path d="M2 7l10 7 10-7" stroke="#BB5A28" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    text: "support@rudrakshaantiquie.com",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#BB5A28" strokeWidth="1.5" />
        <circle cx="12" cy="9" r="2.5" stroke="#BB5A28" strokeWidth="1.5" />
      </svg>
    ),
    text: "Rudraksha Antiquie\nRishikesh, Uttarakhand, India",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" stroke="#BB5A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "+91 XXXXX XXXXX",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#BB5A28" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="#BB5A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Monday – Saturday\n10:00 AM – 6:00 PM (IST)",
  },
];

export default function GetInTouch() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="git-section section-pad" style={{ background: "#FEF9F2" }}>
      <div className="git-row" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: "80px" }}>

        {/* LEFT — info + image */}
        <div className="git-left" style={{ display: "flex", flexDirection: "column", gap: "32px", flexShrink: 0, width: "553px" }}>

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 className="font-prata" style={{ fontSize: "36px", lineHeight: "130%", letterSpacing: "-0.02em", color: "#0B0404", margin: 0 }}>
              Get In Touch
            </h2>
            <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0 }}>
              If you prefer writing to us, please use the form below.
            </p>
          </div>

          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
                <div style={{ flexShrink: 0, width: "24px", height: "24px" }}>{item.icon}</div>
                <span className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", whiteSpace: "pre-line" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="git-img" style={{ width: "100%", height: "320px", position: "relative", overflow: "hidden" }}>
            <Image
              src="/assets/images/common/common.png"
              alt="Contact"
              fill
              sizes="(max-width: 767px) 100vw, 553px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* RIGHT — form */}
        <form className="git-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1, minWidth: 0 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Full Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label className="font-lato" style={{ fontSize: "14px", lineHeight: "140%", color: "#78716C" }}>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="font-lato git-input"
                style={{ fontSize: "16px", lineHeight: "150%", color: "#0B0404", border: "1px solid #E7E5E4", padding: "12px 16px", outline: "none", background: "transparent", width: "100%" }}
              />
            </div>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label className="font-lato" style={{ fontSize: "14px", lineHeight: "140%", color: "#78716C" }}>Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="font-lato git-input"
                style={{ fontSize: "16px", lineHeight: "150%", color: "#0B0404", border: "1px solid #E7E5E4", padding: "12px 16px", outline: "none", background: "transparent", width: "100%" }}
              />
            </div>

            {/* Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label className="font-lato" style={{ fontSize: "14px", lineHeight: "140%", color: "#78716C" }}>Phone Number (Optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="font-lato git-input"
                style={{ fontSize: "16px", lineHeight: "150%", color: "#0B0404", border: "1px solid #E7E5E4", padding: "12px 16px", outline: "none", background: "transparent", width: "100%" }}
              />
            </div>

            {/* Subject */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label className="font-lato" style={{ fontSize: "14px", lineHeight: "140%", color: "#78716C" }}>Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="font-lato git-input"
                style={{ fontSize: "16px", lineHeight: "150%", color: "#0B0404", border: "1px solid #E7E5E4", padding: "12px 16px", outline: "none", background: "transparent", width: "100%" }}
              />
            </div>

            {/* Message */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label className="font-lato" style={{ fontSize: "14px", lineHeight: "140%", color: "#78716C" }}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message"
                className="font-lato git-input"
                style={{ fontSize: "16px", lineHeight: "150%", color: "#0B0404", border: "1px solid #E7E5E4", padding: "12px 16px", outline: "none", background: "transparent", width: "100%", height: "131px", resize: "none" }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="font-lato"
            style={{ width: "100%", padding: "16px 24px", background: "#552912", color: "#FFFFFF", fontSize: "16px", lineHeight: "150%", letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: "pointer" }}
          >
            SUBMIT
          </button>
        </form>

      </div>
    </section>
  );
}
