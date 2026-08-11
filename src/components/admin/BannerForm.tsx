"use client";

import { useState, useActionState } from "react";
import Image from "next/image";
import { createBanner, updateBanner } from "@/app/actions/admin-banners";
import FormField from "@/components/auth/FormField";
import TextAreaField from "@/components/admin/TextAreaField";
import SubmitButton from "@/components/auth/SubmitButton";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { BannerForAdmin } from "@/lib/admin-banners";

interface BannerFormProps {
  banner?: BannerForAdmin;
}

export default function BannerForm({ banner }: BannerFormProps) {
  const action = banner ? updateBanner.bind(null, banner.id) : createBanner;
  const [state, formAction] = useActionState(action, undefined);

  const [imageUrl, setImageUrl] = useState(banner?.imageUrl ?? "");
  const [isActive, setIsActive] = useState(banner?.isActive ?? true);
  const [gradientFrom, setGradientFrom] = useState(banner?.gradientFrom ?? "#298FC2");
  const [gradientTo, setGradientTo] = useState(banner?.gradientTo ?? "#FFFFFF");

  return (
    <form action={formAction} className="flex flex-col gap-8 bg-white p-6 rounded-lg border shadow-sm">
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Banner Information</h2>

        <FormField
          label="Banner Name"
          name="name"
          defaultValue={banner?.name}
          placeholder="e.g. Festival Banner (Shivratri)"
          required
          errors={state?.errors?.name}
        />
        <p className="-mt-2 font-lato text-xs text-gray-text">
          For your own reference in this list — customers never see this name.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Title"
            name="title"
            defaultValue={banner?.title}
            placeholder="e.g. This Shivratri, get the divine blessings of Bhagwaan Shiv"
            required
            errors={state?.errors?.title}
          />
          <FormField
            label="Title Highlight Word(s)"
            name="titleHighlight"
            defaultValue={banner?.titleHighlight ?? ""}
            placeholder="e.g. Shivratri or Indramala"
            errors={state?.errors?.titleHighlight}
          />
        </div>

        <TextAreaField
          label="Subtitle / Description"
          name="subtitle"
          defaultValue={banner?.subtitle ?? ""}
          placeholder="Detailed description shown below title..."
          errors={state?.errors?.subtitle}
        />
      </section>

      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="font-prata text-xl text-dark">Background & Styling</h2>

        <div className="flex flex-col gap-2">
          <Label>Background Image</Label>
          <input type="hidden" name="imageUrl" value={imageUrl} />

          {!imageUrl ? (
            <div className="flex flex-col items-start gap-2">
              <CloudinaryUploadButton onUpload={(url) => setImageUrl(url)} label="Upload Image" />
              <span className="font-lato text-xs text-stone-400">
                A wide image works best — it sits behind the banner text.
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <div className="relative h-36 w-full max-w-md overflow-hidden rounded border bg-stone-100">
                <Image src={imageUrl} alt="Banner Preview" fill className="object-cover" unoptimized />
              </div>
              <div className="flex items-center gap-3">
                <CloudinaryUploadButton onUpload={(url) => setImageUrl(url)} label="Change Image" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="font-lato text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {state?.errors?.imageUrl?.map((m) => (
            <span key={m} className="font-lato text-[13px] text-destructive">{m}</span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gradientFrom">Gradient Highlight Start Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={gradientFrom}
                onChange={(e) => setGradientFrom(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded border border-gray-300 bg-transparent p-1"
              />
              <Input
                id="gradientFrom"
                name="gradientFrom"
                value={gradientFrom}
                onChange={(e) => setGradientFrom(e.target.value)}
                placeholder="#298FC2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gradientTo">Gradient Highlight End Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={gradientTo}
                onChange={(e) => setGradientTo(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded border border-gray-300 bg-transparent p-1"
              />
              <Input
                id="gradientTo"
                name="gradientTo"
                value={gradientTo}
                onChange={(e) => setGradientTo(e.target.value)}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="font-prata text-xl text-dark">CTA & Settings</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Button Text"
            name="ctaText"
            defaultValue={banner?.ctaText ?? "SHOP NOW"}
            placeholder="SHOP NOW"
            errors={state?.errors?.ctaText}
          />
          <FormField
            label="Button Goes To"
            name="ctaLink"
            defaultValue={banner?.ctaLink ?? "#"}
            placeholder="/products"
            errors={state?.errors?.ctaLink}
          />
        </div>

        <p className="rounded-md bg-stone-50 px-3 py-2 font-lato text-xs text-gray-text">
          The position of this banner is set with the up/down arrows on the Banners list — new
          banners are added at the end.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brown focus:ring-brown"
          />
          <Label htmlFor="isActive" className="cursor-pointer font-lato text-sm text-dark">
            Banner is Active (visible on store front)
          </Label>
        </div>
      </section>

      {state?.message && <p className="font-lato text-sm text-destructive">{state.message}</p>}
      <div className="flex justify-end gap-4 border-t pt-6">
        <SubmitButton>{banner ? "Save Changes" : "Create Banner"}</SubmitButton>
      </div>
    </form>
  );
}
