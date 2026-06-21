export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-[#E7DFD6] rounded-md"></div>
        <div className="h-10 w-32 bg-[#E7DFD6] rounded-md"></div>
      </div>

      <div className="rounded-lg border border-[#E7DFD6] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#E7DFD6] bg-[#FEF9F2]">
              <tr>
                <th className="px-6 py-4"><div className="h-4 w-24 bg-[#E7DFD6] rounded-md"></div></th>
                <th className="px-6 py-4"><div className="h-4 w-32 bg-[#E7DFD6] rounded-md"></div></th>
                <th className="px-6 py-4"><div className="h-4 w-20 bg-[#E7DFD6] rounded-md"></div></th>
                <th className="px-6 py-4"><div className="h-4 w-24 bg-[#E7DFD6] rounded-md"></div></th>
                <th className="px-6 py-4 text-right"><div className="h-4 w-16 bg-[#E7DFD6] rounded-md ml-auto"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD6]">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-5"><div className="h-4 w-16 bg-[#F0E4D8] rounded-md"></div></td>
                  <td className="px-6 py-5">
                    <div className="h-4 w-40 bg-[#F0E4D8] rounded-md mb-2"></div>
                    <div className="h-3 w-24 bg-[#E7DFD6] rounded-md"></div>
                  </td>
                  <td className="px-6 py-5"><div className="h-4 w-24 bg-[#F0E4D8] rounded-md"></div></td>
                  <td className="px-6 py-5"><div className="h-4 w-24 bg-[#F0E4D8] rounded-md"></div></td>
                  <td className="px-6 py-5 text-right flex justify-end gap-2">
                    <div className="h-8 w-8 bg-[#E7DFD6] rounded-md"></div>
                    <div className="h-8 w-8 bg-[#E7DFD6] rounded-md"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
