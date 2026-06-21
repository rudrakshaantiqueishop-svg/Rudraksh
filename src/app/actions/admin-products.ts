"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { productSchema } from "@/lib/validations/admin-product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type ProductFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
    }
  | undefined;

function parseProductFormData(formData: FormData) {
  const compareAtRaw = formData.get("compareAtPriceRupees");
  const compareAtPriceCents =
    compareAtRaw && String(compareAtRaw).trim() !== "" ? Math.round(Number(compareAtRaw) * 100) : null;

  const priceRaw = formData.get("priceRupees");
  const priceCents = priceRaw && String(priceRaw).trim() !== "" ? Math.round(Number(priceRaw) * 100) : null;

  const variantsRaw = JSON.parse(String(formData.get("variants") || "[]"));
  const variants = variantsRaw.map((v: any) => ({
    ...v,
    priceDeltaCents: Math.round(Number(v.priceDeltaCents) * 100) || 0
  }));

  const addOnsRaw = JSON.parse(String(formData.get("addOns") || "[]"));
  const addOns = addOnsRaw.map((a: any) => ({
    ...a,
    priceDeltaCents: Math.round(Number(a.priceDeltaCents) * 100) || 0
  }));

  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    breadcrumbLabel: formData.get("breadcrumbLabel"),
    categoryId: formData.get("categoryId"),
    description: formData.get("description"),
    shippingInfo: formData.get("shippingInfo"),
    packagingInfo: formData.get("packagingInfo"),
    returnsInfo: formData.get("returnsInfo"),
    priceCents,
    compareAtPriceCents,
    stockCount: formData.get("stockCount"),
    isBestseller: formData.get("isBestseller") === "on",
    collectionIds: JSON.parse(String(formData.get("collectionIds") || "[]")),
    images: JSON.parse(String(formData.get("images") || "[]")),
    variants,
    addOns,
    sizes: JSON.parse(String(formData.get("sizes") || "[]")),
  };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const result = productSchema.safeParse(parseProductFormData(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }

  const { images, variants, addOns, sizes, collectionIds, ...data } = result.data;

  try {
    await prisma.product.create({
      data: {
        ...data,
        images: { create: images },
        variants: { create: variants },
        addOns: { create: addOns },
        sizes: { create: sizes },
        collections: { connect: collectionIds.map((id) => ({ id })) },
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A product with this slug already exists." };
    }
    throw err;
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const result = productSchema.safeParse(parseProductFormData(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, message: "Please fix the errors below." };
  }

  const { images, variants, addOns, sizes, collectionIds, ...data } = result.data;

  try {
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId: id } }),
      prisma.productVariant.deleteMany({ where: { productId: id } }),
      prisma.productAddOn.deleteMany({ where: { productId: id } }),
      prisma.productSize.deleteMany({ where: { productId: id } }),
      prisma.product.update({
        where: { id },
        data: {
          ...data,
          images: { create: images },
          variants: { create: variants },
          addOns: { create: addOns },
          sizes: { create: sizes },
          collections: { set: collectionIds.map((cid) => ({ id: cid })) },
        },
      }),
    ]);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { message: "A product with this slug already exists." };
    }
    throw err;
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: string): Promise<void> {
  await requireAdmin();

  // 1. Fetch the product to get its image URLs
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true },
  });

  if (!product) return;

  const urlsToCheck = [
    ...product.images.map((img) => img.url),
    ...product.variants.map((v) => v.image).filter(Boolean),
  ] as string[];

  // 2. Delete the product from the database
  await prisma.product.delete({ where: { id } });

  // 3. Clean up Cloudinary only if the image isn't used by another product
  for (const url of new Set(urlsToCheck)) {
    if (!url.includes("res.cloudinary.com")) continue;

    // Verify no other product is using this exact URL
    const otherImageCount = await prisma.productImage.count({ where: { url } });
    const otherVariantCount = await prisma.productVariant.count({ where: { image: url } });

    if (otherImageCount === 0 && otherVariantCount === 0) {
      // Extract the Cloudinary public_id from the URL
      const parts = url.split("/upload/");
      if (parts.length === 2) {
        const pathWithVersion = parts[1];
        const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, "");
        const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");
        
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Failed to delete from Cloudinary:", publicId, error);
        }
      }
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
}
