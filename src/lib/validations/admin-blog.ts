import * as z from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(1, { error: "Slug is required." })
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    error: "Slug must be lowercase letters, numbers, and hyphens only.",
  });

export const blogSchema = z.object({
  title: z.string().trim().min(1, { error: "Title is required." }),
  slug: slugSchema,
  excerpt: z.string().trim().min(1, { error: "Excerpt is required." }),
  body: z
    .string()
    .trim()
    .min(1, { error: "Body is required." })
    .refine((value) => value.replace(/<[^>]*>/g, "").trim().length > 0, {
      error: "Body is required.",
    }),
  coverImage: z.string().trim().min(1, { error: "Cover image is required." }),
  author: z.string().trim().min(1, { error: "Author is required." }),
  readTimeMinutes: z.coerce
    .number()
    .int()
    .positive({ error: "Read time must be a positive number." }),
  categoryId: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
  publishedAt: z.coerce.date(),
});

export type BlogInput = z.infer<typeof blogSchema>;
