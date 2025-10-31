"use client";

import { useGetifterlistbyidQuery } from "@/src/redux/features/ramadan/iftarlist";

const RamadanListPage = ({ params }: { params: { id: string } }) => {
  const { data: ifterlist, isLoading } = useGetifterlistbyidQuery(params.id);

  if (isLoading) return <p>Loading...</p>;

  const data = ifterlist?.result || [];

  // Get Ramadan Year Title from first available item
  const ramadanTitle =
    data.find((item: any) => item.ramadanyear)?.ramadanyear?.titleName ||
    "Ramadan List";

  return (
    <div className="w-full mx-auto min-h-screen  bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
        {ramadanTitle}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-2 border">Serial No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Day</th>
            </tr>
          </thead>

          <tbody>
            {data.flatMap((item: any) =>
              item.doners?.map((doner: any) => (
                <tr key={doner.id} className="text-center hover:bg-gray-100">
                  <td className="p-2 border">{doner.serialNumber}</td>
                  <td className="p-2 border">{doner.name}</td>
                  <td className="p-2 border">
                    {new Date(doner.iftarDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{doner.dayName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RamadanListPage;
