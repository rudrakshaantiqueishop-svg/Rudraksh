export type ProductImageLite = { url: string; alt: string; role: string };

export function getMainImage(images: ProductImageLite[]): ProductImageLite | undefined {
  return images.find((i) => i.role === "MAIN") ?? images[0];
}

export type CategoryPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  introHeading: string;
  introDescription: string;
  introImage: string;
  checklistHeading: string;
  checklist: string[];
  checklistImages: [string, string];
  fitCheckRightLabel: string;
  fitCheckRightItems: string[];
  fitCheckWrongLabel: string;
  fitCheckWrongItems: string[];
  fitCheckImage: string;
};

export function getPageContent(category: { pageContent: unknown }): CategoryPageContent {
  return category.pageContent as CategoryPageContent;
}

export function getSizeCounts(products: { sizes: { label: string }[] }[]): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    for (const s of p.sizes) {
      counts.set(s.label, (counts.get(s.label) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries()).map(([label, count]) => ({ label, count }));
}
