"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/dal";
import { getProductsBySlugs } from "@/lib/products";
import { calculateLifePathNumber, type BirthProfile } from "@/lib/recommendation";
import { birthProfileSchema } from "@/lib/validations/recommendation";

// Loose input shape (tob optional) accepted from clients; always re-validated
// with `birthProfileSchema` before use.
type BirthProfileFields = {
  fullName: string;
  dob: string;
  tob?: string;
  timeNotSure: boolean;
};

type SaveResult =
  | { success: true; profile: BirthProfile }
  | { success: false; error: string };

function toBirthProfile(row: {
  fullName: string;
  dob: string;
  tob: string | null;
  timeNotSure: boolean;
  lifePathNumber: number;
}): BirthProfile {
  return {
    fullName: row.fullName,
    dob: row.dob,
    tob: row.tob ?? undefined,
    timeNotSure: row.timeNotSure,
    lifePathNumber: row.lifePathNumber,
  };
}

// Persist a logged-in user's birth profile. The Life Path Number is always
// recomputed server-side so the stored value can be trusted. Returns the
// saved profile (also used by guests purely for the recomputed number).
export async function saveBirthProfile(input: BirthProfileFields): Promise<SaveResult> {
  const parsed = birthProfileSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid details." };
  }

  const { fullName, dob, tob, timeNotSure } = parsed.data;
  const lifePathNumber = calculateLifePathNumber(dob);

  const profile: BirthProfile = { fullName, dob, tob, timeNotSure, lifePathNumber };

  const user = await getCurrentUser();
  if (!user) {
    // Guest — nothing to persist server-side; the client stores it locally.
    return { success: true, profile };
  }

  const data = { fullName, dob, tob: tob ?? null, timeNotSure, lifePathNumber };
  const row = await prisma.birthProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...data },
    update: data,
  });

  return { success: true, profile: toBirthProfile(row) };
}

// Returns the logged-in user's saved birth profile, or null.
export async function getBirthProfile(): Promise<BirthProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const row = await prisma.birthProfile.findUnique({ where: { userId: user.id } });
  return row ? toBirthProfile(row) : null;
}

// Fetches the product catalog data for an ordered list of recommended slugs.
export async function getRecommendedProducts(slugs: string[]) {
  return getProductsBySlugs(slugs);
}

// Called on login to migrate a guest's locally-stored profile into the DB.
// Does not overwrite an existing saved profile.
export async function mergeGuestBirthProfile(local: BirthProfileFields): Promise<BirthProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const existing = await prisma.birthProfile.findUnique({ where: { userId: user.id } });
  if (existing) return toBirthProfile(existing);

  const parsed = birthProfileSchema.safeParse(local);
  if (!parsed.success) return null;

  const { fullName, dob, tob, timeNotSure } = parsed.data;
  const lifePathNumber = calculateLifePathNumber(dob);

  const row = await prisma.birthProfile.create({
    data: { userId: user.id, fullName, dob, tob: tob ?? null, timeNotSure, lifePathNumber },
  });

  return toBirthProfile(row);
}
