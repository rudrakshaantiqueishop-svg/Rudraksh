import * as z from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(1, { error: "Slug is required." })
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    error: "Slug must be lowercase letters, numbers, and hyphens only.",
  });

export const categorySchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required." }),
  slug: slugSchema,
  image: z.string().trim().min(1, { error: "Image URL is required." }),
  sortOrder: z.coerce.number().int().min(0),
  isActive: z.boolean().optional().default(true),
  heroTitle: z.string().trim().min(1, { error: "Hero title is required." }),
  heroSubtitle: z.string().trim().min(1, { error: "Hero subtitle is required." }),
  introHeading: z.string().trim().min(1, { error: "Intro heading is required." }),
  introDescription: z.string().trim().min(1, { error: "Intro description is required." }),
});

export const subcategorySchema = z.object({
  categoryId: z.string().trim().min(1, { error: "Category is required." }),
  name: z.string().trim().min(1, { error: "Name is required." }),
  slug: slugSchema,
  image: z.string().trim().min(1, { error: "Image URL is required." }),
  group: z.union([z.string().trim().min(1), z.null()]).optional(),
  sortOrder: z.coerce.number().int().min(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type SubcategoryInput = z.infer<typeof subcategorySchema>;
