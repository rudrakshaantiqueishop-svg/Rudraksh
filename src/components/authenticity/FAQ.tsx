"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Can a piece be authentic but still not feel right for me?",
    answer: "Yes. Authenticity confirms the material—not personal alignment.",
  },
  {
    question: "Do all products come with certification?",
    answer: "Most items come with certification. The type—lab or in-house—depends on the piece. Details are shared clearly on each product page.",
  },
  {
    question: "Is lab certification always required?",
    answer: "Not always. Some items use structured in-house certification with documented criteria. Both are valid; what matters is transparency about the method used.",
  },
  {
    question: "Can I review the certification before buying?",
    answer: "Yes. Certification details are shared with your purchase. If you need to review specifics beforehand, you can reach out to us directly.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section style={{ background: "#FEF9F2", padding: "70px", display: "flex", flexDirection: "column", gap: "48px" }}>

      {/* Header */}
      <h2
        className="font-prata"
        style={{ fontSize: "36px", lineHeight: "129%", letterSpacing: "-0.02em", color: "#0A0503", textAlign: "center", margin: 0 }}
      >
        Your Questions Answered
      </h2>

      {/* FAQ list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E7E5E4",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {/* Question row */}
              <div
                style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span
                  className="font-prata"
                  style={{ flex: 1, fontSize: "30px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0A0503" }}
                >
                  {faq.question}
                </span>
                <div style={{
                  flexShrink: 0,
                  width: "48px", height: "48px",
                  border: "1px solid #E7E5E4",
                  borderRadius: "24px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6 12H18" stroke="#0A0503" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 6V18M6 12H18" stroke="#0A0503" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Answer */}
              {isOpen && (
                <p
                  className="font-lato"
                  style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}
                >
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
