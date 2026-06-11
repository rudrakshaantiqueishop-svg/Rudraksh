"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import {
  phoneSchema,
  addressSchema,
  nameSchema,
  emailSchema,
  MAX_ADDRESSES,
  PHONE_COUNTRY_CODE,
} from "@/lib/validations/account";

export type AccountFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
      success?: boolean;
    }
  | undefined;

export async function updatePhone(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const user = await requireUser();

  const parsed = phoneSchema.safeParse({ phone: formData.get("phone") });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const phone = `${PHONE_COUNTRY_CODE}${parsed.data.phone}`;

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing && existing.id !== user.id) {
    return { message: "This phone number is already linked to another account." };
  }

  await prisma.user.update({ where: { id: user.id }, data: { phone } });
  revalidatePath("/account");

  return { message: "Phone number saved.", success: true };
}

export async function updateName(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const user = await requireUser();

  const parsed = nameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });
  revalidatePath("/account");

  return { message: "Name saved.", success: true };
}

export async function updateEmail(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const user = await requireUser();

  const parsed = emailSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing && existing.id !== user.id) {
    return { message: "This email address is already taken." };
  }

  await prisma.user.update({
    where: { id: user.id },
    // If the user changes their email, we reset emailVerified to null
    // You would typically send a new verification email here as well
    data: { 
      email: parsed.data.email,
      emailVerified: parsed.data.email === user.email ? user.emailVerified : null 
    },
  });
  revalidatePath("/account");

  return { message: "Email saved.", success: true };
}

export async function addAddress(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const user = await requireUser();

  const count = await prisma.address.count({ where: { userId: user.id } });
  if (count >= MAX_ADDRESSES) {
    return { message: `You can only save up to ${MAX_ADDRESSES} addresses.` };
  }

  const parsed = addressSchema.safeParse({
    label: formData.get("label"),
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    line1: formData.get("line1"),
    line2: formData.get("line2"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    isDefault: formData.get("isDefault") === "on",
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { isDefault, phone, ...data } = parsed.data;
  const shouldBeDefault = isDefault || count === 0;

  if (shouldBeDefault) {
    await prisma.address.updateMany({ where: { userId: user.id }, data: { isDefault: false } });
  }

  await prisma.address.create({
    data: {
      ...data,
      phone: `${PHONE_COUNTRY_CODE}${phone}`,
      userId: user.id,
      isDefault: shouldBeDefault,
    },
  });

  revalidatePath("/account/addresses");
  return { message: "Address saved.", success: true };
}

export async function deleteAddress(addressId: string): Promise<void> {
  const user = await requireUser();
  await prisma.address.deleteMany({ where: { id: addressId, userId: user.id } });
  revalidatePath("/account/addresses");
}
