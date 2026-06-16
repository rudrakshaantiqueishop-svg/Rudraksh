import * as z from "zod";

export const PRODUCT_IMAGE_ROLES = [
  "MAIN",
  "GALLERY_LEFT",
  "GALLERY_TOP_RIGHT",
  "GALLERY_BOTTOM_RIGHT",
  "EXTRA",
] as const;

const slugSchema = z
  .string()
  .trim()
  .min(1, { error: "Slug is required." })
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    error: "Slug must be lowercase letters, numbers, and hyphens only.",
  });

export const productImageSchema = z.object({
  url: z.string().trim().min(1, { error: "Image URL is required." }),
  alt: z.string().trim().min(1, { error: "Alt text is required." }),
  role: z.enum(PRODUCT_IMAGE_ROLES),
  sortOrder: z.number().int().min(0),
});

export const productVariantSchema = z.object({
  label: z.string().trim().min(1, { error: "Label is required." }),
  priceDeltaCents: z.coerce.number().int(),
  image: z.string().trim().min(1, { error: "Image URL is required." }),
  sortOrder: z.number().int().min(0),
});

export const productAddOnSchema = z.object({
  label: z.string().trim().min(1, { error: "Label is required." }),
  priceDeltaCents: z.coerce.number().int(),
  sortOrder: z.number().int().min(0),
});

export const productSizeSchema = z.object({
  label: z.string().trim().min(1, { error: "Label is required." }),
  sortOrder: z.number().int().min(0),
});

export const productSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required." }),
  slug: slugSchema,
  breadcrumbLabel: z.string().trim().min(1, { error: "Breadcrumb label is required." }),
  categoryId: z.string().trim().min(1, { error: "Category is required." }),
  description: z.string().trim().min(1, { error: "Description is required." }),
  shippingInfo: z.string().trim().min(1, { error: "Shipping info is required." }),
  packagingInfo: z.string().trim().min(1, { error: "Packaging info is required." }),
  returnsInfo: z.string().trim().min(1, { error: "Returns info is required." }),
  priceCents: z.coerce.number().int().positive({ error: "Price must be a positive number." }),
  compareAtPriceCents: z
    .union([z.coerce.number().int().positive(), z.null()])
    .optional(),
  stockCount: z.coerce.number().int().min(0, { error: "Stock cannot be negative." }),
  isBestseller: z.boolean(),
  collectionIds: z.array(z.string()),
  images: z.array(productImageSchema).min(1, { error: "At least one image is required." }),
  variants: z.array(productVariantSchema),
  addOns: z.array(productAddOnSchema),
  sizes: z.array(productSizeSchema),
});

export type ProductInput = z.infer<typeof productSchema>;
