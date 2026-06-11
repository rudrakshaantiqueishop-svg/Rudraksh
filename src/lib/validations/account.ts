import * as z from "zod";

export const MAX_ADDRESSES = 2;

export const PHONE_COUNTRY_CODE = "+91";

const phoneRegex = /^[0-9]{10}$/;

export const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, { error: "Please enter a valid 10-digit phone number." }),
});

export type PhoneInput = z.infer<typeof phoneSchema>;

const optionalTrimmed = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

export const addressSchema = z.object({
  label: optionalTrimmed,
  fullName: z.string().trim().min(2, { error: "Full name is required." }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, { error: "Please enter a valid 10-digit phone number." }),
  line1: z.string().trim().min(1, { error: "Address line 1 is required." }),
  line2: optionalTrimmed,
  city: z.string().trim().min(1, { error: "City is required." }),
  state: z.string().trim().min(1, { error: "State is required." }),
  postalCode: z.string().trim().min(1, { error: "Postal code is required." }),
  country: z.string().trim().min(1, { error: "Country is required." }),
  isDefault: z.boolean().optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;

export const nameSchema = z.object({
  name: z.string().trim().min(2, { error: "Name must be at least 2 characters." }),
});

export const emailSchema = z.object({
  email: z.string().trim().email({ error: "Please enter a valid email address." }),
});
