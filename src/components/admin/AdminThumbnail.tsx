"use client";

interface AdminThumbnailProps {
  src: string;
  alt: string;
}

export default function AdminThumbnail({ src, alt }: AdminThumbnailProps) {
  if (!src) return <div className="size-12 rounded bg-secondary" />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="size-12 rounded object-cover"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}
