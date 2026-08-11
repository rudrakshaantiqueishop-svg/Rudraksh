import { requireUser } from "@/lib/dal";
import AccountSidebar from "@/components/account/AccountSidebar";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();

  return (
    <section className="bg-cream min-h-[calc(100vh-72px)] py-6 sm:py-10">
      <div className="flex w-full flex-col gap-6 px-4 sm:px-6 lg:px-8 md:flex-row md:gap-10">
        <AccountSidebar name={user.name} email={user.email} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </section>
  );
}
