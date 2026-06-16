"use client";

import { useActionState } from "react";
import { createProduct, updateProduct } from "@/app/actions/admin-products";
import { PRODUCT_IMAGE_ROLES } from "@/lib/validations/admin-product";
import type { ProductForAdmin } from "@/lib/admin-products";
import ArrayFieldEditor from "@/components/admin/ArrayFieldEditor";
import ProductCollectionsField from "@/components/admin/ProductCollectionsField";
import TextAreaField from "@/components/admin/TextAreaField";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IMAGE_ROLE_OPTIONS = PRODUCT_IMAGE_ROLES.map((role) => ({ value: role, label: role }));

interface ProductFormProps {
  product?: ProductForAdmin;
  categories: { id: string; name: string }[];
  collections: { id: string; name: string }[];
}

export default function ProductForm({ product, categories, collections }: ProductFormProps) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Name"
            name="name"
            defaultValue={product?.name}
            required
            errors={state?.errors?.name}
          />
          <FormField
            label="Slug"
            name="slug"
            defaultValue={product?.slug}
            placeholder="lowercase-with-hyphens"
            required
            errors={state?.errors?.slug}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Breadcrumb Label"
            name="breadcrumbLabel"
            defaultValue={product?.breadcrumbLabel}
            required
            errors={state?.errors?.breadcrumbLabel}
          />
          <div className="flex flex-col gap-1.5">
            <Label>Category</Label>
            <Select
              name="categoryId"
              defaultValue={product?.categoryId ?? categories[0]?.id}
              items={categories.map((category) => ({ value: category.id, label: category.name }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.categoryId?.map((message) => (
              <span key={message} className="font-lato text-[13px] text-destructive">
                {message}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Pricing &amp; Stock</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label="Price (cents)"
            name="priceCents"
            type="number"
            defaultValue={product?.priceCents}
            required
            errors={state?.errors?.priceCents}
          />
          <FormField
            label="Compare-at Price (cents)"
            name="compareAtPriceCents"
            type="number"
            defaultValue={product?.compareAtPriceCents ?? ""}
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

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Content</h2>
        <TextAreaField
          label="Description"
          name="description"
          defaultValue={product?.description}
          required
          errors={state?.errors?.description}
        />
        <TextAreaField
          label="Shipping Info"
          name="shippingInfo"
          defaultValue={product?.shippingInfo}
          required
          errors={state?.errors?.shippingInfo}
        />
        <TextAreaField
          label="Packaging Info"
          name="packagingInfo"
          defaultValue={product?.packagingInfo}
          required
          errors={state?.errors?.packagingInfo}
        />
        <TextAreaField
          label="Returns Info"
          name="returnsInfo"
          defaultValue={product?.returnsInfo}
          required
          errors={state?.errors?.returnsInfo}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Images</h2>
        <ArrayFieldEditor
          name="images"
          label="Image"
          fields={[
            { key: "url", label: "Image URL", placeholder: "/assets/images/products/...", preview: true },
            { key: "alt", label: "Alt Text" },
            { key: "role", label: "Role", type: "select", options: IMAGE_ROLE_OPTIONS },
          ]}
          defaultItems={product?.images.map(({ url, alt, role }) => ({ url, alt, role })) ?? []}
          emptyItem={{ url: "", alt: "", role: "EXTRA" }}
          errors={state?.errors?.images}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Variants</h2>
        <p className="font-lato text-xs text-gray-text">
          &quot;Select Your Design&quot; options shown on the product page.
        </p>
        <ArrayFieldEditor
          name="variants"
          label="Variant"
          fields={[
            { key: "label", label: "Label" },
            { key: "priceDeltaCents", label: "Price Delta (cents)", type: "number" },
            { key: "image", label: "Image URL", placeholder: "/assets/images/products/...", preview: true },
          ]}
          defaultItems={
            product?.variants.map(({ label, priceDeltaCents, image }) => ({
              label,
              priceDeltaCents,
              image,
            })) ?? []
          }
          emptyItem={{ label: "", priceDeltaCents: 0, image: "" }}
          errors={state?.errors?.variants}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Add-Ons</h2>
        <p className="font-lato text-xs text-gray-text">
          &quot;Select Energization&quot; options shown on the product page.
        </p>
        <ArrayFieldEditor
          name="addOns"
          label="Add-On"
          fields={[
            { key: "label", label: "Label" },
            { key: "priceDeltaCents", label: "Price Delta (cents)", type: "number" },
          ]}
          defaultItems={
            product?.addOns.map(({ label, priceDeltaCents }) => ({ label, priceDeltaCents })) ?? []
          }
          emptyItem={{ label: "", priceDeltaCents: 0 }}
          errors={state?.errors?.addOns}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Sizes</h2>
        <ArrayFieldEditor
          name="sizes"
          label="Size"
          fields={[{ key: "label", label: "Label" }]}
          defaultItems={product?.sizes.map(({ label }) => ({ label })) ?? []}
          emptyItem={{ label: "" }}
          errors={state?.errors?.sizes}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">Collections</h2>
        <ProductCollectionsField
          collections={collections}
          defaultValue={product?.collections.map((collection) => collection.id) ?? []}
        />
      </section>

      {state?.message && (
        <p className="font-lato text-sm text-destructive">{state.message}</p>
      )}

      <SubmitButton>{product ? "Save Changes" : "Create Product"}</SubmitButton>
    </form>
  );
}
