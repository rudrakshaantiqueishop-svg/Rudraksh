import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getUserForAdmin } from "@/lib/admin-users";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserForAdmin(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/users"
          className="text-gray-text transition-colors hover:text-dark"
          aria-label="Back to users"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </Link>
        <h1 className="font-prata text-2xl text-dark">{user.name ?? "User"}</h1>
      </div>

      <div className="border border-border p-6">
        <h2 className="mb-4 font-prata text-lg text-dark">Profile</h2>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-lato text-xs uppercase tracking-wide text-gray-text">Name</dt>
            <dd className="font-lato text-sm text-dark">{user.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="font-lato text-xs uppercase tracking-wide text-gray-text">Email</dt>
            <dd className="font-lato text-sm text-dark">{user.email}</dd>
          </div>
          <div>
            <dt className="font-lato text-xs uppercase tracking-wide text-gray-text">Phone</dt>
            <dd className="font-lato text-sm text-dark">{user.phone ?? "—"}</dd>
          </div>
          <div>
            <dt className="font-lato text-xs uppercase tracking-wide text-gray-text">Role</dt>
            <dd className="font-lato text-sm text-dark">
              <span className="inline-block border border-border px-2 py-0.5 text-xs uppercase tracking-wide">
                {user.role}
              </span>
            </dd>
          </div>
          <div>
            <dt className="font-lato text-xs uppercase tracking-wide text-gray-text">Joined</dt>
            <dd className="font-lato text-sm text-dark">{user.createdAt.toLocaleDateString()}</dd>
          </div>
        </dl>
      </div>

      <div className="border border-border p-6">
        <h2 className="mb-4 font-prata text-lg text-dark">Addresses</h2>
        {user.addresses.length === 0 ? (
          <p className="font-lato text-sm text-gray-text">No saved addresses.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {user.addresses.map((address) => (
              <div key={address.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <p className="mb-1 font-lato text-base font-bold text-dark">
                  {address.label ?? "Address"} {address.isDefault && "(Default)"}
                </p>
                <p className="font-lato text-sm text-gray-text">
                  {address.fullName}, {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
                  {address.postalCode}, {address.country}
                </p>
                <p className="font-lato text-sm text-gray-text">{address.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-border p-6">
        <h2 className="mb-4 font-prata text-lg text-dark">Order History</h2>
        <p className="font-lato text-sm text-gray-text">This user hasn&apos;t placed any orders yet.</p>
      </div>
    </div>
  );
}
