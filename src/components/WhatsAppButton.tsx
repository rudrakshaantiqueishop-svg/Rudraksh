"use client";

import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "919557366978";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hello, I would like to inquire about Rudraksha Antique products."
  )}`;

  return (
    <aside
      aria-label="WhatsApp Support"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center group pointer-events-auto select-none"
    >
      {/* Tooltip / pill label */}
      <div
        className={`hidden sm:flex items-center bg-white/95 backdrop-blur-sm text-neutral-800 text-xs font-medium px-3.5 py-1.5 rounded-full shadow-lg border border-neutral-100 mr-2.5 transition-all duration-300 origin-right ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-2 scale-95 pointer-events-none"
        }`}
      >
        <span className="font-lato font-semibold tracking-wide text-[#0B0404]">
          Chat with us
        </span>
      </div>

      {/* WhatsApp FAB */}
      <a
        id="whatsapp-sticky-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (+91 95573 66978)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] hover:bg-[#20bd5a] active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Subtle breathing ripple */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10 pointer-events-none"
          style={{ animationDuration: "3s" }}
        />

        {/* WhatsApp Icon */}
        <svg
          className="w-8 h-8 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.67 20.16 9.33 19.8 8.15 19.1L7.87 18.93L4.76 19.75L5.59 16.72L5.4 16.42C4.63 15.19 4.22 13.57 4.22 11.91C4.22 7.37 7.92 3.67 12.04 3.67ZM8.97 7.37C8.77 7.37 8.5 7.45 8.27 7.7C8.04 7.95 7.4 8.55 7.4 9.77C7.4 10.99 8.29 12.17 8.41 12.33C8.54 12.5 10.16 14.99 12.63 16.06C14.68 16.95 15.1 16.77 15.55 16.73C16 16.69 17.01 16.14 17.21 15.57C17.41 15 17.41 14.51 17.35 14.41C17.29 14.31 17.13 14.25 16.89 14.13C16.65 14.01 15.47 13.43 15.25 13.35C15.03 13.27 14.87 13.23 14.71 13.47C14.55 13.71 14.09 14.25 13.95 14.41C13.81 14.57 13.67 14.59 13.43 14.47C13.19 14.35 12.42 14.1 11.51 13.29C10.8 12.66 10.32 11.88 10.18 11.64C10.04 11.4 10.16 11.27 10.28 11.15C10.39 11.04 10.53 10.86 10.65 10.72C10.77 10.58 10.81 10.48 10.89 10.32C10.97 10.16 10.93 10.02 10.87 9.9C10.81 9.78 10.33 8.59 10.13 8.11C9.94 7.65 9.74 7.71 9.59 7.7C9.44 7.69 9.27 7.69 9.1 7.69L8.97 7.37Z" />
        </svg>
      </a>
    </aside>
  );
}
