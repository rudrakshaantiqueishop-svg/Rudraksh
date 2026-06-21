// Canonical product prices are stored in INR paise. This is a small
// display-only conversion layer — exchange rates are static for now.

export type CurrencyCode = "USD" | "INR";

export const CURRENCIES: Record<CurrencyCode, { symbol: string; rate: number }> = {
  INR: { symbol: "₹", rate: 1 },
  USD: { symbol: "$", rate: 1 / 97 }, // 1 USD = 97 INR
};

export function formatPrice(cents: number, currency: CurrencyCode): string {
  const { symbol, rate } = CURRENCIES[currency];
  const amount = (cents / 100) * rate;
  const formatted = currency === "INR"
    ? Math.round(amount).toLocaleString("en-IN")
    : amount.toFixed(2);
  return `${symbol}${formatted}`;
}
