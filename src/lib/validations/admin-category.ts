import * as z from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(1, { error: "Web address is required." })
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    error: "Web address can only use lowercase letters, numbers, and hyphens.",
  });

// Landing-page copy is optional in the admin form: blank fields are filled with
// sensible defaults derived from the category name (see buildPageContent).
const optionalText = z.string().trim().min(1).optional();

export const categorySchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required." }),
  slug: slugSchema,
  image: z.string().trim().min(1, { error: "Please upload a category image." }),
  isActive: z.boolean().optional().default(true),
  heroTitle: optionalText,
  heroSubtitle: optionalText,
  introHeading: optionalText,
  introDescription: optionalText,
});

export const subcategorySchema = z.object({
  categoryId: z.string().trim().min(1, { error: "Category is required." }),
  name: z.string().trim().min(1, { error: "Name is required." }),
  slug: slugSchema,
  image: z.string().trim().min(1, { error: "Please upload an image." }),
  group: z.union([z.string().trim().min(1), z.null()]).optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type SubcategoryInput = z.infer<typeof subcategorySchema>;
