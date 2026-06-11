"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Are all Rudraksha beads here certified?",
    answer: "Yes. Every Rudraksha listed includes certification after verification.",
  },
  {
    question: "Do I need to energise my Rudraksha?",
    answer: "Energisation is a personal spiritual practice, not a requirement. You may choose to follow traditional rituals if it aligns with your beliefs.",
  },
  {
    question: "Can I wear Rudraksha daily?",
    answer: "Yes. Rudraksha beads are traditionally worn daily and are suitable for regular use with basic care.",
  },
  {
    question: "How do I know which mukhi is right for me?",
    answer: "Mukhi selection depends on personal intention and guidance. Our How to Choose guide and experts can help you decide.",
  },
  {
    question: "Are these natural or lab-treated?",
    answer: "All Rudraksha listed here are natural. Any treatment or processing, if applicable, is clearly disclosed on the product page.",
  },
];

export default function ProductsFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section className="faq-section section-pad" style={{ background: "#FEF9F2", display: "flex", flexDirection: "column", gap: "48px" }}>

      <h2 className="font-prata title-fluid" style={{ letterSpacing: "-0.02em", color: "#0A0503", textAlign: "center", margin: 0 }}>
        Your Questions Answered
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px", width: "100%", margin: "0 auto" }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="faq-card"
              style={{ background: "#FFFFFF", border: "1px solid #E7E5E4", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span className="font-prata faq-question" style={{ flex: 1, fontSize: "24px", lineHeight: "140%", letterSpacing: "-0.02em", color: "#0A0503" }}>
                  {faq.question}
                </span>
                <div style={{
                  flexShrink: 0, width: "48px", height: "48px",
                  border: "1px solid #E7E5E4", borderRadius: "24px",
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
              {isOpen && (
                <p className="font-lato" style={{ fontSize: "16px", lineHeight: "150%", color: "#44403C", margin: 0, fontWeight: 400 }}>
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
