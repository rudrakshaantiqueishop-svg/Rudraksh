"use client";

import { cn } from "@/lib/utils";

interface AdminThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

export default function AdminThumbnail({ src, alt, className }: AdminThumbnailProps) {
  if (!src) return <div className={cn("size-12 rounded bg-secondary", className)} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("size-12 rounded object-cover", className)}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}
