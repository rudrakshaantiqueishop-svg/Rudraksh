"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CloudinaryUploadButtonProps {
  onUpload: (url: string) => void;
  label?: string;
}

export default function CloudinaryUploadButton({ onUpload, label = "Upload Image" }: CloudinaryUploadButtonProps) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/sign"
      options={{
        folder: "Rudraksh",
        multiple: false,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
        maxFileSize: 10000000,
      }}
      onSuccess={(result) => {
        if (result.event === "success" && typeof result.info === "object" && result.info !== null) {
          const info = result.info as { secure_url: string };
          onUpload(info.secure_url);
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
