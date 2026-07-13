"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";

const roleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["CUSTOMER", "WRITER", "ADMIN"]),
});

export type RoleFormState = { error?: string; success?: boolean } | undefined;

export async function updateUserRole(
  _prevState: RoleFormState,
  formData: FormData
): Promise<RoleFormState> {
  const admin = await requireAdmin();

  const parsed = roleSchema.safeParse({
    userId: formData.get("userId"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { error: "Invalid role selection." };
  }

  const { userId, role } = parsed.data;

  // Guard: an admin cannot demote themselves (avoids locking out the last admin).
  if (userId === admin.id && role !== "ADMIN") {
    return { error: "You cannot change your own admin role." };
  }

  await prisma.user.update({ where: { id: userId }, data: { role } });

  revalidatePath(`/admin/users/${userId}`);
  revalidatePath("/admin/users");
  return { success: true };
}
