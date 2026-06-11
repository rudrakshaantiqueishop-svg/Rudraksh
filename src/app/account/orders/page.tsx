export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-prata text-2xl text-dark">Order History</h2>

      <div className="border border-border p-6">
        <p className="font-lato text-base text-[#78716C]">
          You haven&apos;t placed any orders yet.
        </p>
      </div>
    </div>
  );
}
