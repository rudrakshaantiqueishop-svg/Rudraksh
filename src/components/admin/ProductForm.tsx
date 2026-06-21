"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createProduct, updateProduct } from "@/app/actions/admin-products";
import type { ProductForAdmin } from "@/lib/admin-products";
import ArrayFieldEditor from "@/components/admin/ArrayFieldEditor";
import ProductCollectionsField from "@/components/admin/ProductCollectionsField";
import ProductImagesField from "@/components/admin/ProductImagesField";
import ProductSizesField from "@/components/admin/ProductSizesField";
import TextAreaField from "@/components/admin/TextAreaField";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_SHIPPING =
  "Orders are processed within 1-2 business days and shipped via tracked courier. Domestic orders typically arrive within 2-4 working days, while international orders take 7-12 working days depending on destination and customs clearance. A tracking link is emailed as soon as your order ships, and free shipping applies to all domestic orders over ₹2000.";

const DEFAULT_PACKAGING =
  "Every piece is wrapped in a soft protective pouch and placed in a branded box with a printed authenticity card. Malas and bracelets are cushioned to prevent bead movement during transit, and fragile items are additionally wrapped in bubble layers inside a rigid outer carton.";

const DEFAULT_RETURNS =
  "If you're not satisfied, you can request a return within 30 days of delivery for a full refund, provided the item is unused and returned in its original packaging with the authenticity card. Energised items and made-to-order combinations are non-returnable once the energization process has been completed. Cancellations made before an order ships are processed immediately; once shipped, the standard return process applies.";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ProductFormProps {
  product?: ProductForAdmin;
  categories: { id: string; name: string }[];
  collections: { id: string; name: string }[];
}

export default function ProductForm({ product, categories, collections }: ProductFormProps) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction] = useActionState(action, undefined);

  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!product?.slug);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugTouched) setSlug(toSlug(e.target.value));
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {/* ── Basic Info ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Name"
            name="name"
            defaultValue={product?.name}
            required
            onChange={handleNameChange}
            errors={state?.errors?.name}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              required
              placeholder="auto-generated-from-name"
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            />
            <p className="font-lato text-xs text-gray-text">
              URL path for this product: /products/<em>{slug || "slug"}</em>
            </p>
            {state?.errors?.slug?.map((msg) => (
              <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <FormField
              label="Breadcrumb Label"
              name="breadcrumbLabel"
              defaultValue={product?.breadcrumbLabel}
              required
              errors={state?.errors?.breadcrumbLabel}
            />
            <p className="font-lato text-xs text-gray-text">
              Short name shown in the navigation trail: Home › Products › <em>this label</em>
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Category</Label>
            <Select
              name="categoryId"
              defaultValue={product?.categoryId ?? categories[0]?.id}
              items={categories.map((c) => ({ value: c.id, label: c.name }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.categoryId?.map((msg) => (
              <span key={msg} className="font-lato text-[13px] text-destructive">{msg}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing & Stock ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Pricing &amp; Stock</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label="Price (₹)"
            name="priceRupees"
            type="number"
            defaultValue={product ? product.priceCents / 100 : ""}
            required
            errors={state?.errors?.priceCents}
          />
          <FormField
            label="Compare-at Price (₹)"
            name="compareAtPriceRupees"
            type="number"
            defaultValue={product?.compareAtPriceCents ? product.compareAtPriceCents / 100 : ""}
            errors={state?.errors?.compareAtPriceCents}
          />
          <FormField
            label="Stock Count"
            name="stockCount"
            type="number"
            defaultValue={product?.stockCount ?? 0}
            required
            errors={state?.errors?.stockCount}
          />
        </div>
        <label className="flex items-center gap-2 font-lato text-sm text-dark">
          <Checkbox name="isBestseller" value="on" defaultChecked={product?.isBestseller ?? false} />
          Mark as bestseller
        </label>
      </section>

      {/* ── Content ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Content</h2>
        <p className="font-lato text-xs text-gray-text">
          All fields are pre-filled with standard Rudraksha Antiquei copy — edit anything product-specific.
        </p>
        <TextAreaField
          label="Description"
          name="description"
          defaultValue={product?.description ?? ""}
          required
          errors={state?.errors?.description}
        />
        <TextAreaField
          label="Shipping Info"
          name="shippingInfo"
          defaultValue={product?.shippingInfo ?? DEFAULT_SHIPPING}
          required
          errors={state?.errors?.shippingInfo}
        />
        <TextAreaField
          label="Packaging Info"
          name="packagingInfo"
          defaultValue={product?.packagingInfo ?? DEFAULT_PACKAGING}
          required
          errors={state?.errors?.packagingInfo}
        />
        <TextAreaField
          label="Returns Info"
          name="returnsInfo"
          defaultValue={product?.returnsInfo ?? DEFAULT_RETURNS}
          required
          errors={state?.errors?.returnsInfo}
        />
      </section>

      {/* ── Images ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Images</h2>
        <p className="font-lato text-xs text-gray-text">
          4 fixed image slots that make up the product gallery. Paste a URL or upload via Cloudinary (coming soon).
        </p>
        <ProductImagesField
          defaultItems={product?.images.map(({ url, alt, role }) => ({ url, alt, role }))}
          errors={state?.errors?.images}
        />
      </section>

      {/* ── Variants ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Design Variants</h2>
        <p className="font-lato text-xs text-gray-text">
          Optional. These appear as circular swatches under &quot;Select Your Design&quot; on the product page — use them when the same product comes in multiple designs (e.g. different bead patterns). Each variant can have its own image and price adjustment. Leave empty if the product has only one design.
        </p>
        <ArrayFieldEditor
          name="variants"
          label="Variant"
          fields={[
            { key: "label", label: "Label", placeholder: "e.g. Silver Cap" },
            { key: "priceDeltaCents", label: "Extra price (₹)", type: "number" },
            { key: "image", label: "Image URL", placeholder: "/assets/images/...", preview: true },
          ]}
          defaultItems={
            product?.variants.map(({ label, priceDeltaCents, image }) => ({
              label,
              priceDeltaCents: priceDeltaCents / 100,
              image,
            })) ?? []
          }
          emptyItem={{ label: "", priceDeltaCents: 0, image: "" }}
          errors={state?.errors?.variants}
        />
      </section>

      {/* ── Add-Ons ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Add-Ons (Energization)</h2>
        <p className="font-lato text-xs text-gray-text">
          Optional. Shown as &quot;Select Energization&quot; on the product page — extra services the customer can choose (e.g. &quot;Basic Energization&quot; free, &quot;Vedic Puja Energization&quot; +₹500). Leave empty to hide the section. Extra price 0 = free.
        </p>
        <ArrayFieldEditor
          name="addOns"
          label="Add-On"
          fields={[
            { key: "label", label: "Label", placeholder: "e.g. Vedic Puja Energization" },
            { key: "priceDeltaCents", label: "Extra price (₹)", type: "number" },
          ]}
          defaultItems={
            product?.addOns.map(({ label, priceDeltaCents }) => ({ 
              label, 
              priceDeltaCents: priceDeltaCents / 100 
            })) ?? []
          }
          emptyItem={{ label: "", priceDeltaCents: 0 }}
          errors={state?.errors?.addOns}
        />
      </section>

      {/* ── Sizes ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Sizes</h2>
        <p className="font-lato text-xs text-gray-text">
          Bead sizes (6mm, 8mm…) or wearable sizes (S, M, L) available for this product. Leave empty to hide the size selector.
        </p>
        <ProductSizesField
          defaultItems={product?.sizes.map(({ label }) => ({ label })) ?? []}
          errors={state?.errors?.sizes}
        />
      </section>

      {/* ── Collections ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Collections</h2>
        <ProductCollectionsField
          collections={collections}
          defaultValue={product?.collections.map((c) => c.id) ?? []}
        />
      </section>

      {state?.message && (
        <p className="font-lato text-sm text-destructive">{state.message}</p>
      )}

      <SubmitButton>{product ? "Save Changes" : "Create Product"}</SubmitButton>
    </form>
  );
}
