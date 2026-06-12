"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Will I receive the exact product shown?",
    answer: "Yes. Images represent the actual product.",
  },
  {
    question: "Is certification included?",
    answer: "Yes, each Rudraksha is accompanied by documented certification confirming its authenticity.",
  },
  {
    question: "Can I consult before buying?",
    answer: "Yes, our experts are available for guidance before you make a purchase—without any obligation.",
  },
  {
    question: "Can I wear it daily?",
    answer: "Yes. Rudraksha beads are traditionally worn daily and are suitable for regular use with basic care.",
  },
];

export default function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <h2 className="font-prata text-3xl lg:text-[36px] text-dark text-center m-0 mb-8">Your Questions Answered</h2>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question} className="border border-[#E7DFD6] bg-white p-5 lg:p-6 flex flex-col gap-2">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex items-center justify-between gap-4 w-full text-left"
              >
                <span className="font-prata text-base lg:text-lg text-dark">{faq.question}</span>
                <span className="w-8 h-8 border border-[#E7DFD6] flex items-center justify-center shrink-0 text-dark">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              {isOpen && <p className="font-lato text-sm text-gray-text m-0">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
