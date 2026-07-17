"use client";

import { useState } from "react";

type ShareRowProps = {
  title: string;
};

function shareUrl(kind: "facebook" | "twitter" | "whatsapp" | "email", url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  switch (kind) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case "whatsapp":
      return `https://api.whatsapp.com/send?text=${t}%20${u}`;
    case "email":
      return `mailto:?subject=${t}&body=${u}`;
  }
}

const ICONS = {
  facebook: (
    <path d="M14 8.5h1.5V6H14c-1.66 0-3 1.34-3 3v1.5H9V13h2v5h2.5v-5H15l.5-2.5h-2V9c0-.28.22-.5.5-.5Z" fill="currentColor" />
  ),
  twitter: (
    <path d="M18 7.2c-.44.2-.92.33-1.42.4.51-.31.9-.79 1.09-1.37-.48.28-1.01.49-1.58.6A2.48 2.48 0 0 0 11.3 9.1a7.03 7.03 0 0 1-5.1-2.59 2.48 2.48 0 0 0 .77 3.31c-.4-.01-.78-.12-1.11-.3v.03c0 1.2.85 2.2 1.98 2.43-.36.1-.75.11-1.12.04a2.48 2.48 0 0 0 2.31 1.72A4.98 4.98 0 0 1 5 14.78 7.02 7.02 0 0 0 8.79 15.9c4.55 0 7.04-3.77 7.04-7.04v-.32c.48-.35.9-.79 1.23-1.29Z" fill="currentColor" />
  ),
  whatsapp: (
    <path d="M12 5.5a6.5 6.5 0 0 0-5.6 9.79L5.5 18.5l3.32-.86A6.5 6.5 0 1 0 12 5.5Zm3.55 9.03c-.15.42-.87.8-1.2.83-.31.03-.6.16-2.01-.42-1.7-.7-2.77-2.44-2.85-2.55-.08-.11-.68-.9-.68-1.71 0-.82.43-1.22.58-1.39a.6.6 0 0 1 .44-.2h.32c.1 0 .24-.04.38.28.15.36.5 1.24.54 1.33.04.09.07.2.01.31-.06.11-.09.18-.18.28-.09.1-.19.23-.27.31-.09.09-.18.18-.08.36.1.18.44.73.95 1.18.65.58 1.2.76 1.38.85.18.09.28.08.38-.05.11-.12.44-.51.55-.69.11-.18.23-.15.38-.09.15.05 1 .47 1.17.56.17.09.28.13.32.2.05.08.05.43-.1.85Z" fill="currentColor" />
  ),
  email: (
    <path d="M6 7.5h12c.55 0 1 .45 1 1v7c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1Zm.4 1.2 5.6 3.8 5.6-3.8" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
} as const;

export default function ShareRow({ title }: ShareRowProps) {
  const [copied, setCopied] = useState(false);

  function open(kind: keyof typeof ICONS) {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const href = shareUrl(kind, url, title);
    if (kind === "email") {
      window.location.assign(href);
    } else {
      window.open(href, "_blank", "noopener,noreferrer,width=600,height=500");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="flex items-center gap-4 mt-12 pt-8 border-t border-[#E7DFD6]">
      <span className="font-lato text-sm font-semibold text-dark">Share this article:</span>
      <div className="flex items-center gap-2.5">
        {(Object.keys(ICONS) as (keyof typeof ICONS)[]).map((kind) => (
          <button
            key={kind}
            onClick={() => open(kind)}
            aria-label={`Share on ${kind}`}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E7DFD6] text-brown hover:bg-brown hover:text-white hover:border-brown transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {ICONS[kind]}
            </svg>
          </button>
        ))}
        <button
          onClick={copyLink}
          aria-label="Copy link"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E7DFD6] text-brown hover:bg-brown hover:text-white hover:border-brown transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6h-1.5M15 12a3 3 0 0 1-3 3H9a3 3 0 1 1 0-6h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {copied && <span className="font-lato text-xs text-gray-text">Link copied</span>}
      </div>
    </div>
  );
}
