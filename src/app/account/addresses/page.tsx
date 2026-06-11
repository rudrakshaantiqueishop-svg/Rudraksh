import { Trash2 } from "lucide-react";
import { requireUser } from "@/lib/dal";
import { deleteAddress } from "@/app/actions/account";
import { MAX_ADDRESSES } from "@/lib/validations/account";
import AddressForm from "@/components/account/AddressForm";

export default async function AddressesPage() {
  const user = await requireUser();
  const canAddMore = user.addresses.length < MAX_ADDRESSES;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-prata text-2xl text-dark">Addresses</h2>

      <div className="border border-border p-6">
        {user.addresses.length === 0 ? (
          <p className="font-lato text-base text-[#78716C]">
            You haven&apos;t saved any addresses yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {user.addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="mb-1 font-lato text-base font-bold text-dark">
                    {address.label ?? "Address"} {address.isDefault && "(Default)"}
                  </p>
                  <p className="font-lato text-sm text-gray-text">
                    {address.fullName}, {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
                    {address.postalCode}, {address.country}
                  </p>
                  <p className="font-lato text-sm text-[#78716C]">{address.phone}</p>
                </div>
                <form action={deleteAddress.bind(null, address.id)}>
                  <button
                    type="submit"
                    aria-label="Delete address"
                    className="text-gray-text transition-colors hover:text-destructive"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>

      {canAddMore ? (
        <div className="border border-border p-6">
          <h3 className="mb-4 font-prata text-lg text-dark">Add a New Address</h3>
          <AddressForm defaultName={user.name} defaultPhone={user.phone} />
        </div>
      ) : (
        <p className="font-lato text-sm text-[#78716C]">
          You&apos;ve reached the maximum of {MAX_ADDRESSES} saved addresses. Delete one to add a
          new address.
        </p>
      )}
    </div>
  );
}
