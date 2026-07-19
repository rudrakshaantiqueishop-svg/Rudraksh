import type { CategoryPageContent } from "@/lib/product-utils";

// The editable subset of pageContent exposed in the admin category form.
export type CategoryContentInput = {
  name: string;
  image: string;
  heroTitle: string;
  heroSubtitle: string;
  introHeading: string;
  introDescription: string;
};

const DEFAULT_CHECKLIST_IMAGES: [string, string] = [
  "/assets/images/about/about-sacred-1.png",
  "/assets/images/about/about-sacred-2.png",
];

// Builds a complete CategoryPageContent from the handful of fields the admin
// edits, merging over any existing content so unedited sections (checklist,
// fit-check, explore designs) are preserved on update.
export function buildPageContent(
  input: CategoryContentInput,
  existing?: Partial<CategoryPageContent>
): CategoryPageContent {
  return {
    heroTitle: input.heroTitle,
    heroSubtitle: input.heroSubtitle,
    introHeading: input.introHeading,
    introDescription: input.introDescription,
    introImage: input.image,
    checklistHeading: existing?.checklistHeading ?? `Every ${input.name} Item You See Here Is`,
    checklist:
      existing?.checklist ?? [
        "Physically examined for authenticity and finish",
        "Sourced from trusted, traditional suppliers",
        "Quality-checked before it is listed",
        "Provided with certification where applicable",
        "Final-checked and cleansed before dispatch",
      ],
    checklistImages: existing?.checklistImages ?? DEFAULT_CHECKLIST_IMAGES,
    fitCheckRightLabel: existing?.fitCheckRightLabel ?? `${input.name} May Be Right for You If:`,
    fitCheckRightItems:
      existing?.fitCheckRightItems ?? [
        "You value authenticity over appearance",
        "You're seeking spiritual grounding and traditional guidance",
        "You want honest information, not exaggerated claims",
      ],
    fitCheckWrongLabel: existing?.fitCheckWrongLabel ?? `${input.name} May Not Be Right for You If:`,
    fitCheckWrongItems:
      existing?.fitCheckWrongItems ?? [
        "You're looking for instant or guaranteed outcomes",
        "You prefer purely decorative pieces with no context",
        "You're unsure and don't want any guidance",
      ],
    fitCheckImage: existing?.fitCheckImage ?? input.image,
    exploreDesigns:
      existing?.exploreDesigns ?? {
        heading: "Explore Our Collection",
        description: `Browse the different types of ${input.name.toLowerCase()} available, each verified and cared for the same way.`,
        items: [
          { title: "Traditional", description: "Classic forms for regular spiritual use.", image: input.image },
          { title: "Everyday", description: "Comfortable, ready-to-wear or ready-to-place pieces.", image: input.image },
          { title: "Premium", description: "Higher-grade selections for collectors and gifting.", image: input.image },
          { title: "Energized", description: "Cleansed and energized on request before dispatch.", image: input.image },
        ],
      },
  };
}
