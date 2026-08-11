"use client";

import { useState, useActionState, useMemo, useEffect } from "react";
import Image from "next/image";
import { createInspiredItem, updateInspiredItem } from "@/app/actions/admin-inspired";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { InspiredItemForAdmin, StoreCatalogForAdmin } from "@/lib/admin-inspired";

interface InspiredFormProps {
  item?: InspiredItemForAdmin;
  catalog?: StoreCatalogForAdmin;
}

export default function InspiredForm({ item, catalog = [] }: InspiredFormProps) {
  const action = item ? updateInspiredItem.bind(null, item.id) : createInspiredItem;
  const [state, formAction] = useActionState(action, undefined);

  // Controlled states for auto-syncing
  const [title, setTitle] = useState(item?.title ?? "");
  const [type, setType] = useState(item?.type ?? "video");
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? "");
  const [productImageUrl, setProductImageUrl] = useState(item?.productImageUrl ?? "");
  const [price, setPrice] = useState(item?.price ?? "");
  const [originalPrice, setOriginalPrice] = useState(item?.originalPrice ?? "");
  const [isActive, setIsActive] = useState(item?.isActive ?? true);

  // Compute initial Category & Subcategory from linked productId
  const initialCategoryAndSubcategory = useMemo(() => {
    if (!item?.productId || catalog.length === 0) {
      return { categoryId: "", subcategoryId: "" };
    }
    for (const cat of catalog) {
      const foundProd = cat.products.find((p) => p.id === item.productId);
      if (foundProd) {
        return {
          categoryId: cat.id,
          subcategoryId: foundProd.subcategoryId || "",
        };
      }
    }
    return { categoryId: "", subcategoryId: "" };
  }, [item?.productId, catalog]);

  // Step-by-step catalog selection states
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialCategoryAndSubcategory.categoryId
  );
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>(
    initialCategoryAndSubcategory.subcategoryId
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(item?.productId ?? "");

  // Auto-sync dropdowns when item.productId or catalog resolves
  useEffect(() => {
    if (item?.productId && catalog.length > 0 && !selectedCategoryId) {
      for (const cat of catalog) {
        const foundProd = cat.products.find((p) => p.id === item.productId);
        if (foundProd) {
          setSelectedCategoryId(cat.id);
          setSelectedSubcategoryId(foundProd.subcategoryId || "");
          setSelectedProductId(item.productId);
          break;
        }
      }
    }
  }, [item?.productId, catalog, selectedCategoryId]);

  // Available Subcategories based on selected Category
  const availableSubcategories = useMemo(() => {
    if (!selectedCategoryId) return [];
    const cat = catalog.find((c) => c.id === selectedCategoryId);
    return cat?.subcategories || [];
  }, [catalog, selectedCategoryId]);

  // Available Products based on selected Category and Subcategory
  const availableProducts = useMemo(() => {
    if (!selectedCategoryId) return [];
    const cat = catalog.find((c) => c.id === selectedCategoryId);
    if (!cat) return [];
    if (!selectedSubcategoryId) return cat.products;
    return cat.products.filter((p) => p.subcategoryId === selectedSubcategoryId);
  }, [catalog, selectedCategoryId, selectedSubcategoryId]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catId = e.target.value;
    setSelectedCategoryId(catId);
    setSelectedSubcategoryId("");
    setSelectedProductId("");
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategoryId(e.target.value);
    setSelectedProductId("");
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prodId = e.target.value;
    setSelectedProductId(prodId);

    const selectedProd = availableProducts.find((p) => p.id === prodId);
    if (selectedProd) {
      // 1. Auto-fill Product Thumbnail Image
      const prodImg = selectedProd.images[0]?.url;
      if (prodImg) {
        setProductImageUrl(prodImg);
      }

      // 2. Auto-fill Formatted Price
      const formattedPrice = `$${(selectedProd.priceCents / 100).toFixed(2)}`;
      setPrice(formattedPrice);

      if (selectedProd.compareAtPriceCents) {
        const formattedComparePrice = `$${(selectedProd.compareAtPriceCents / 100).toFixed(2)}`;
        setOriginalPrice(formattedComparePrice);
      } else {
        setOriginalPrice("");
      }

      // 3. Pre-fill title if empty or default
      if (!title || title.startsWith("Sacred Store Visit")) {
        setTitle(`${selectedProd.name} Review`);
      }
    }
  };

  return (
    <form action={formAction} className="flex flex-col gap-8 bg-white p-6 rounded-lg border shadow-sm font-lato">
      {/* STEP-BY-STEP PRODUCT CATALOG LINK SELECTOR */}
      <section className="flex flex-col gap-4 bg-amber-50/60 p-5 rounded-lg border border-amber-200/80">
        <div>
          <h2 className="font-prata text-xl text-dark">1. Sync with Product Catalog (Optional)</h2>
          <p className="text-xs text-gray-text mt-0.5">
            Select Category &gt; Subcategory &gt; Product to automatically fill the Product Thumbnail Image & Price.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Step 1: Category */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category-select" className="font-semibold text-dark text-xs uppercase tracking-wider">
              Step 1: Category
            </Label>
            <select
              id="category-select"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-dark focus:ring-2 focus:ring-brown"
            >
              <option value="">-- Select Category --</option>
              {catalog.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.products.length} products)
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Subcategory */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="subcategory-select" className="font-semibold text-dark text-xs uppercase tracking-wider">
              Step 2: Subcategory
            </Label>
            <select
              id="subcategory-select"
              value={selectedSubcategoryId}
              onChange={handleSubcategoryChange}
              disabled={!selectedCategoryId}
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-dark disabled:opacity-50 focus:ring-2 focus:ring-brown"
            >
              <option value="">-- All Subcategories --</option>
              {availableSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Product */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="product-select" className="font-semibold text-dark text-xs uppercase tracking-wider">
              Step 3: Choose Product
            </Label>
            <select
              id="product-select"
              value={selectedProductId}
              onChange={handleProductChange}
              disabled={!selectedCategoryId || availableProducts.length === 0}
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-dark disabled:opacity-50 focus:ring-2 focus:ring-brown font-medium"
            >
              <option value="">-- Choose Product --</option>
              {availableProducts.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name} (${(prod.priceCents / 100).toFixed(2)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <input type="hidden" name="productId" value={selectedProductId} />
      </section>

      {/* BASIC INFORMATION */}
      <section className="flex flex-col gap-4">
        <h2 className="font-prata text-xl text-dark">2. Card Information</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Title / Review Name</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sacred Store Visit & Mala Review"
              required
            />
            {state?.errors?.title?.map((m) => (
              <span key={m} className="text-[13px] text-destructive">{m}</span>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="type">Card Type</Label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-lato"
            >
              <option value="video">Video (YouTube Short)</option>
              <option value="image">Image Only</option>
            </select>
          </div>
        </div>

        {type === "video" && (
          <FormField
            label="YouTube Short / Video URL"
            name="videoUrl"
            defaultValue={item?.videoUrl ?? ""}
            placeholder="e.g. https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH"
            errors={state?.errors?.videoUrl}
          />
        )}
      </section>

      {/* IMAGES */}
      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="font-prata text-xl text-dark">3. Images</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Main Cover Image */}
          <div className="flex flex-col gap-2">
            <Label>Cover / Background Image</Label>
            <input type="hidden" name="imageUrl" value={imageUrl} />

            {!imageUrl ? (
              <div className="flex flex-col items-start gap-2">
                <CloudinaryUploadButton onUpload={(url) => setImageUrl(url)} label="Upload Image" />
                <span className="text-xs text-stone-400">
                  A tall (portrait) image works best for these cards.
                </span>
              </div>
            ) : (
              <div className="flex items-end gap-3">
                <div className="relative h-32 w-24 overflow-hidden rounded border bg-stone-100 shadow-sm">
                  <Image src={imageUrl} alt="Cover Preview" fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <CloudinaryUploadButton onUpload={(url) => setImageUrl(url)} label="Change" />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {state?.errors?.imageUrl?.map((m) => (
              <span key={m} className="text-[13px] text-destructive">{m}</span>
            ))}
          </div>

          {/* Inset Product Image */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Small Product Thumbnail (shown on the card)</Label>
              {selectedProductId && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  🔒 Synced from Product Catalog
                </span>
              )}
            </div>
            <input type="hidden" name="productImageUrl" value={productImageUrl} />

            <div className="flex items-end gap-3">
              {productImageUrl ? (
                <div className="relative h-20 w-20 overflow-hidden rounded border-2 border-stone-200 bg-stone-100 shadow-sm">
                  <Image src={productImageUrl} alt="Product Inset Preview" fill className="object-cover" unoptimized />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded border-2 border-dashed border-stone-200 text-center text-[10px] text-stone-400">
                  No image
                </div>
              )}

              {selectedProductId ? (
                <p className="text-xs text-gray-text">
                  Taken automatically from the product you picked above.
                </p>
              ) : (
                <div className="flex flex-col items-start gap-2">
                  <CloudinaryUploadButton
                    onUpload={(url) => setProductImageUrl(url)}
                    label={productImageUrl ? "Change" : "Upload Image"}
                  />
                  {productImageUrl && (
                    <button
                      type="button"
                      onClick={() => setProductImageUrl("")}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>

            {state?.errors?.productImageUrl?.map((m) => (
              <span key={m} className="text-[13px] text-destructive">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE & DISPLAY SETTINGS */}
      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="font-prata text-xl text-dark">4. Price & Display Settings</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="price">Price</Label>
              {selectedProductId && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  🔒 Synced
                </span>
              )}
            </div>
            <Input
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              readOnly={!!selectedProductId}
              placeholder="e.g. $230.00"
              className={selectedProductId ? "bg-stone-100/80 cursor-not-allowed text-stone-600 font-medium" : ""}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="originalPrice">Original / Compare Price</Label>
              {selectedProductId && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  🔒 Synced
                </span>
              )}
            </div>
            <Input
              id="originalPrice"
              name="originalPrice"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              readOnly={!!selectedProductId}
              placeholder="e.g. $250.00"
              className={selectedProductId ? "bg-stone-100/80 cursor-not-allowed text-stone-600" : ""}
            />
          </div>

        </div>

        <p className="rounded-md bg-stone-50 px-3 py-2 text-xs text-gray-text">
          The position of this card is set with the up/down arrows on the Get Inspired list — new
          cards are added at the end.
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
            Item is Active (visible in Get Inspired section)
          </Label>
        </div>
      </section>

      {state?.message && <p className="text-sm text-destructive">{state.message}</p>}
      <div className="flex justify-end gap-4 border-t pt-6">
        <SubmitButton>{item ? "Save Changes" : "Create Item"}</SubmitButton>
      </div>
    </form>
  );
}
