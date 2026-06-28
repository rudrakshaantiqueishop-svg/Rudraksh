import * as z from "zod";

export const birthProfileSchema = z.object({
  fullName: z.string().trim().min(2, { error: "Please enter your full name." }),
  dob: z
    .string()
    .trim()
    .min(1, { error: "Date of birth is required." })
    .refine((v) => v.replace(/\D/g, "").length >= 8, { error: "Please enter a valid date of birth." }),
  tob: z.string().trim().optional().transform((v) => (v ? v : undefined)),
  timeNotSure: z.boolean().optional().default(false),
});

export type BirthProfileInput = z.infer<typeof birthProfileSchema>;
