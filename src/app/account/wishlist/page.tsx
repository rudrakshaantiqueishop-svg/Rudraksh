import { requireUser } from "@/lib/dal";
import { getWishlistItems } from "@/lib/wishlist-server";
import WishlistGrid from "@/components/account/WishlistGrid";

export default async function WishlistPage() {
  const user = await requireUser();
  const items = await getWishlistItems(user.id);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-prata text-2xl text-dark">Wishlist</h2>

      {items.length === 0 ? (
        <div className="border border-border p-6">
          <p className="font-lato text-base text-[#78716C]">
            Your wishlist is empty.
          </p>
        </div>
      ) : (
        <WishlistGrid items={items} />
      )}
    </div>
  );
}
