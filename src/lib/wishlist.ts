export type WishlistItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  compareAtPriceCents: number | null;
};
