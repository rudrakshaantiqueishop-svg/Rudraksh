"use server";

import { searchProducts } from "@/lib/products";

export async function searchProductsAction(query: string) {
  if (query.trim().length < 2) return [];
  return searchProducts(query);
}
