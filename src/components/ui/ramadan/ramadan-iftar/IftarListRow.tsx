"use client";

import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useItferlistQuery } from "@/src/redux/features/ramadan/iftarlist";
import { useDeletedonernameMutation } from "@/src/redux/features/ramadan/itikafApi";
import EditRamadnModal from "./EditRamadnModal";

export interface Doner {
  id: string;
  serialNumber: string;
  name: string;
  iftarDate: string;
  dayName: string;
  ifterListId: string;
}

export interface RamadhanYear {
  id: string;
  ramadanYear: string;
  titleName: string;
}

export interface IftarListResponse {
  id: string;
  ramadanyearId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  ramadanyear: RamadhanYear | null;
  doners: Doner[];
}

const IftarListTable: React.FC = () => {
  const { data: ifterListData, isLoading } = useItferlistQuery(undefined);
  const [removeIftar] = useDeletedonernameMutation();

  if (isLoading)
    return <p className="text-center py-6 text-gray-600">Loading...</p>;

  const rows =
    ifterListData?.result.flatMap((list: IftarListResponse) =>
      list.doners.map((doner: Doner) => ({
        ...doner,
        ramadanYear: list.ramadanyear?.ramadanYear ?? "-",
        ramadanyearId: list.ramadanyearId,
      }))
    ) || [];

  if (rows.length === 0)
    return <p className="text-center py-6 text-gray-600">No Data Available</p>;

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeIftar(id).unwrap();
          Swal.fire("Deleted!", "Record removed successfully.", "success");
        } catch {
          Swal.fire("Failed!", "Something went wrong!", "error");
        }
      }
    });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700 border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="px-4 py-3 text-center">#</th>
            <th className="px-4 py-3 text-center">Serial No</th>
            <th className="px-4 py-3 text-center">Name</th>
            <th className="px-4 py-3 text-center">Date</th>
            <th className="px-4 py-3 text-center">Day</th>
            <th className="px-4 py-3 text-center">Ramadan Year</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y bg-white">
          {rows.map((row: any, i: number) => (
            <tr key={row.id} className="hover:bg-gray-50 text-center">
              <td className="px-4 py-3">{i + 1}</td>
              <td className="px-4 py-3">{row.serialNumber}</td>
              <td className="px-4 py-3">{row.name}</td>
              <td className="px-4 py-3">
                {format(new Date(row.iftarDate), "dd/MM/yyyy")}
              </td>
              <td className="px-4 py-3">{row.dayName}</td>
              <td className="px-4 py-3">{row.ramadanYear}</td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">


                  <EditRamadnModal item={row} />

                  <Button
                    size="sm"
                    onClick={() => handleDelete(row.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                  >
                    <FaTrashAlt size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IftarListTable;
