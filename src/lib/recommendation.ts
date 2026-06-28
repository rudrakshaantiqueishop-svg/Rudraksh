// Rudraksha recommendation engine — numerology based.
//
// The recommendation is derived purely from the Date of Birth using the
// classic "Life Path Number" digit-sum reduction. No astrology, no birth
// place, no external services — fully deterministic arithmetic.

export const BIRTH_PROFILE_STORAGE_KEY = "rudraksha-birth-profile";

export type BirthProfile = {
  fullName: string;
  dob: string; // raw value from the <input type="date"> / form (e.g. "1995-08-15")
  tob?: string; // stored, but not used in the calculation
  timeNotSure: boolean;
  lifePathNumber: number;
};

/**
 * Reduce the digits of a date string to a single Life Path Number (1-9).
 * Digit-sum is order-independent, so this is robust whether the date arrives
 * as "dd-mm-yyyy", "yyyy-mm-dd", or with any separator.
 *
 * Example: 15-08-1995 -> 1+5+0+8+1+9+9+5 = 38 -> 3+8 = 11 -> 1+1 = 2
 */
export function calculateLifePathNumber(dob: string): number {
  const digits = dob.replace(/\D/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9) {
    sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

/**
 * Maps each Life Path Number (1-9) to recommended product slugs, primary
 * first. Edit this table to retune which Rudraksha each number maps to.
 * Slugs must match Product.slug values in the catalog/seed.
 */
export const NUMBER_TO_MUKHI: Record<number, string[]> = {
  1: ["12-mukhi-rudraksha"],
  2: ["5-mukhi-rudraksha"],
  3: ["5-mukhi-rudraksha"],
  4: ["4-mukhi-regular-rudraksha"],
  5: ["4-mukhi-regular-rudraksha"],
  6: ["6-mukhi-rudraksha"],
  7: ["9-mukhi-rudraksha"],
  8: ["7-mukhi-rudraksha"],
  9: ["8-mukhi-rudraksha"],
};

/** A short, friendly note shown alongside the recommendation per number. */
export const NUMBER_INSIGHTS: Record<number, string> = {
  1: "A natural leader — bold, independent, and driven.",
  2: "Gentle and intuitive — a peacemaker who values harmony.",
  3: "Expressive and creative — full of optimism and ideas.",
  4: "Grounded and disciplined — a builder of lasting things.",
  5: "Curious and adaptable — a free spirit who loves change.",
  6: "Caring and responsible — devoted to family and balance.",
  7: "Reflective and wise — a seeker of deeper truths.",
  8: "Ambitious and resilient — focused on lasting success.",
  9: "Compassionate and giving — guided by a higher purpose.",
};

/** Returns the recommended product slugs for a given DOB. */
export function getRecommendedSlugs(dob: string): { lifePathNumber: number; slugs: string[] } {
  const lifePathNumber = calculateLifePathNumber(dob);
  return { lifePathNumber, slugs: NUMBER_TO_MUKHI[lifePathNumber] ?? [] };
}

// --- Guest (localStorage) persistence --------------------------------------

/** Reads the guest's birth profile from localStorage (browser only). */
export function readLocalBirthProfile(): BirthProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BIRTH_PROFILE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BirthProfile) : null;
  } catch {
    return null;
  }
}

/** Writes the guest's birth profile to localStorage (browser only). */
export function writeLocalBirthProfile(profile: BirthProfile): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BIRTH_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore quota / serialization errors
  }
}

/** Clears the guest's birth profile from localStorage (browser only). */
export function clearLocalBirthProfile(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(BIRTH_PROFILE_STORAGE_KEY);
  } catch {
    // ignore
  }
}
