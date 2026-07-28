import * as z from "zod";

export const MAX_REVIEW_BODY_LENGTH = 500;

export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .min(1, { error: "Please select a rating." })
    .max(5, { error: "Rating must be between 1 and 5." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),
  title: z
    .string()
    .trim()
    .min(2, { message: "Title is required." })
    .max(100, { message: "Title must be under 100 characters." }),
  body: z
    .string()
    .trim()
    .min(10, { message: "Review must be at least 10 characters." })
    .max(MAX_REVIEW_BODY_LENGTH, { message: `Review must be under ${MAX_REVIEW_BODY_LENGTH} characters.` }),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
