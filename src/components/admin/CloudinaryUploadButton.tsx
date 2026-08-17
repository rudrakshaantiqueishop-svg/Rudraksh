"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CloudinaryUploadButtonProps {
  onUpload: (url: string) => void;
  label?: string;
}

/**
 * Optimizes Cloudinary URLs by automatically applying WebP/AVIF format auto-conversion,
 * smart quality compression (q_auto), and a maximum width constraint (w_1600).
 */
export function optimizeCloudinaryUrl(url: string, maxWidth = 1600): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  if (url.includes("/f_auto,q_auto")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${maxWidth},c_limit/`);
}

export default function CloudinaryUploadButton({ onUpload, label = "Upload Image" }: CloudinaryUploadButtonProps) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/sign"
      options={{
        folder: "Rudraksh",
        multiple: false,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
        maxFileSize: 5000000, // Max 5MB file upload limit
        maxImageWidth: 1600, // Automatically scale down oversized images
        maxImageHeight: 1600,
      }}
      onSuccess={(result) => {
        if (result.event === "success" && typeof result.info === "object" && result.info !== null) {
          const info = result.info as { secure_url: string };
          const optimizedUrl = optimizeCloudinaryUrl(info.secure_url);
          onUpload(optimizedUrl);
        }
      }}
    >
      {({ open }) => (
        <Button type="button" variant="outline" size="sm" onClick={() => open()}>
          <Upload size={14} strokeWidth={1.5} />
          {label}
        </Button>
      )}
    </CldUploadWidget>
  );
}
