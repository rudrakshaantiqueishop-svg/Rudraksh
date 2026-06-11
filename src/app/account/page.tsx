import { requireUser } from "@/lib/dal";
import PhoneForm from "@/components/account/PhoneForm";

export default async function AccountProfilePage() {
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-prata text-2xl text-dark">Profile</h2>

      {!user.emailVerified && (
        <div className="border border-accent bg-[#FFF4E5] px-5 py-4">
          <p className="font-lato text-sm text-dark">
            Your email address is not verified. Please check your inbox for a verification link.
          </p>
        </div>
      )}

      <div className="border border-border p-6">
        <dl className="flex flex-col gap-3 font-lato text-base text-gray-text">
          <div>
            <dt className="inline font-bold text-dark">Name: </dt>
            <dd className="inline">{user.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="inline font-bold text-dark">Email: </dt>
            <dd className="inline">{user.email}</dd>
          </div>
        </dl>
      </div>

      <div className="border border-border p-6">
        <h3 className="mb-4 font-prata text-lg text-dark">Phone Number</h3>
        <PhoneForm phone={user.phone} />
      </div>
    </div>
  );
}
