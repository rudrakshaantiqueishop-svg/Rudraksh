"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyOrderButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-[#78716C] hover:text-[#552912] bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded transition-colors"
      title="Copy Order ID"
    >
      {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
      <span>{copied ? "Copied" : "Copy ID"}</span>
    </button>
  );
}
