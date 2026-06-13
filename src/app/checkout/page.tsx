import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { getCartItems } from "@/lib/cart-server";
import { getCartTotals } from "@/lib/cart";
import CheckoutView from "@/components/checkout/CheckoutView";

export default async function CheckoutPage() {
  const user = await requireUser();
  const items = await getCartItems(user.id);

  if (items.length === 0) {
    redirect("/cart");
  }

  const { itemCount, subtotalCents } = getCartTotals(items);

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      {/* Breadcrumb */}
      <div className="font-lato text-xs tracking-[0.5px] uppercase text-gray-text mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brown transition-colors">Home</Link>
        <span>›</span>
        <Link href="/cart" className="hover:text-brown transition-colors">Cart</Link>
        <span>›</span>
        <span className="text-dark font-semibold">Checkout</span>
      </div>

      <h1 className="font-prata text-3xl lg:text-[34px] text-dark m-0 mb-8">Checkout</h1>

      <CheckoutView items={items} addresses={user.addresses} itemCount={itemCount} subtotalCents={subtotalCents} />
    </section>
  );
}
