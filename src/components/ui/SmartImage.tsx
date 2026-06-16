"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function isCloudinaryUrl(url: string): boolean {
  return !!CLOUD && url.includes(`res.cloudinary.com/${CLOUD}/`);
}

function isValidSrc(url: string): boolean {
  return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://");
}

// Extract Cloudinary public ID from a full secure_url
// e.g. https://res.cloudinary.com/dxyz/image/upload/v123/Rudraksh/abc.jpg → Rudraksh/abc
function toPublicId(url: string): string {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
  return match ? match[1] : url;
}

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function SmartImage({ src, alt, fill, width, height, sizes, className, priority }: SmartImageProps) {
  if (!isValidSrc(src)) return null;

  if (isCloudinaryUrl(src)) {
    return (
      <CldImage
        src={toPublicId(src)}
        alt={alt}
        fill={fill}
        width={!fill ? (width ?? 800) : undefined}
        height={!fill ? (height ?? 800) : undefined}
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
