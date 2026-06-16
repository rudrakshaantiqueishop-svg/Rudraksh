"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";

const SLOTS = [
  { role: "MAIN", label: "Main Image", hint: "Large hero image shown at top-left" },
  { role: "GALLERY_LEFT", label: "Gallery Left", hint: "Tall left panel in the 3-image row" },
  { role: "GALLERY_TOP_RIGHT", label: "Gallery Top-Right", hint: "Top slot of the right column" },
  { role: "GALLERY_BOTTOM_RIGHT", label: "Gallery Bottom-Right", hint: "Bottom slot of the right column" },
] as const;

type SlotRole = (typeof SLOTS)[number]["role"];
interface SlotValues { url: string; alt: string; }

interface ProductImagesFieldProps {
  defaultItems?: { url: string; alt: string; role: string }[];
  errors?: string[];
}

export default function ProductImagesField({ defaultItems = [], errors }: ProductImagesFieldProps) {
  const initial = Object.fromEntries(
    SLOTS.map(({ role }) => {
      const found = defaultItems.find((item) => item.role === role);
      return [role, { url: found?.url ?? "", alt: found?.alt ?? "" }];
    })
  ) as Record<SlotRole, SlotValues>;

  const [slots, setSlots] = useState(initial);

  function update(role: SlotRole, field: keyof SlotValues, value: string) {
    setSlots((prev) => ({ ...prev, [role]: { ...prev[role], [field]: value } }));
  }

  const serialized = JSON.stringify(
    SLOTS.filter(({ role }) => slots[role].url).map(({ role }, i) => ({
      url: slots[role].url,
      alt: slots[role].alt,
      role,
      sortOrder: i,
    }))
  );

  return (
    <div className="flex flex-col gap-5">
      <input type="hidden" name="images" value={serialized} />

      {SLOTS.map(({ role, label, hint }) => (
        <div key={role} className="flex gap-4 border border-border p-4">
          {/* Preview */}
          <div className="shrink-0">
            {slots[role].url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slots[role].url}
                alt=""
                className="h-24 w-24 rounded border border-border object-cover"
                onError={(e) => { e.currentTarget.style.opacity = "0.2"; }}
                onLoad={(e) => { e.currentTarget.style.opacity = "1"; }}
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded border border-dashed border-border bg-secondary">
                <span className="font-lato text-[10px] text-gray-text text-center px-1">{label}</span>
              </div>
            )}
          </div>

          {/* Inputs */}
          <div className="flex flex-1 flex-col gap-2">
            <div>
              <p className="font-lato text-sm font-semibold text-dark">{label}</p>
              <p className="font-lato text-xs text-gray-text">{hint}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={slots[role].url}
                    onChange={(e) => update(role, "url", e.target.value)}
                    placeholder="Paste URL or upload →"
                    className="flex-1"
                  />
                  <CloudinaryUploadButton
                    label="Upload"
                    onUpload={(url) => update(role, "url", url)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Alt Text</Label>
                <Input
                  type="text"
                  value={slots[role].alt}
                  onChange={(e) => update(role, "alt", e.target.value)}
                  placeholder="Describe the image for accessibility"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {errors?.map((msg) => (
        <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
      ))}
    </div>
  );
}
