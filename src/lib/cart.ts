export const MAX_CART_QUANTITY = 10;

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPriceCents: number;
  variantId?: string;
  variantLabel?: string;
  sizeId?: string;
  sizeLabel?: string;
  addOnId?: string;
  addOnLabel?: string;
  quantity: number;
};

export function getCartTotals(items: CartItem[]): { itemCount: number; subtotalCents: number } {
  let itemCount = 0;
  let subtotalCents = 0;
  for (const item of items) {
    itemCount += item.quantity;
    subtotalCents += item.unitPriceCents * item.quantity;
  }
  return { itemCount, subtotalCents };
}
