"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { productSchema } from "@/lib/validations/admin-product";

export type ProductFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
    }
  | undefined;

function parseProductFormData(formData: FormData) {
  const compareAtRaw = formData.get("compareAtPriceCents");
  const compareAtPriceCents =
    compareAtRaw && String(compareAtRaw).trim() !== "" ? Number(compareAtRaw) : null;

  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    breadcrumbLabel: formData.get("breadcrumbLabel"),
    categoryId: formData.get("categoryId"),
    description: formData.get("description"),
    shippingInfo: formData.get("shippingInfo"),
    packagingInfo: formData.get("packagingInfo"),
    returnsInfo: formData.get("returnsInfo"),
    priceCents: formData.get("priceCents"),
    compareAtPriceCents,
    stockCount: formData.get("stockCount"),
    isBestseller: formData.get("isBestseller") === "on",
    collectionIds: JSON.parse(String(formData.get("collectionIds") || "[]")),
    images: JSON.parse(String(formData.get("images") || "[]")),
    variants: JSON.parse(String(formData.get("variants") || "[]")),
    addOns: JSON.parse(String(formData.get("addOns") || "[]")),
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
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}
