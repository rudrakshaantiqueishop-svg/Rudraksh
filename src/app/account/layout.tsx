import { requireUser } from "@/lib/dal";
import AccountSidebar from "@/components/account/AccountSidebar";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();

  return (
    <section className="bg-cream" style={{ height: "calc(100vh - 72px)" }}>
      <div className="flex h-full w-full flex-col gap-4 px-6 py-[10px] md:flex-row md:gap-12">
        <AccountSidebar name={user.name} email={user.email} />
        <main className="min-w-0 flex-1 overflow-y-auto pb-24 md:pb-0">{children}</main>
      </div>
    </section>
  );
}
