"use client";

import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { useGetifterlistbyidQuery } from "@/src/redux/features/ramadan/iftarlist";
import { useParams } from "next/navigation";

const RamadanListPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: ifterlist, isLoading } = useGetifterlistbyidQuery(id);

  if (isLoading) {
    return <LoaderScreen />;
  }

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
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RamadanListPage;
