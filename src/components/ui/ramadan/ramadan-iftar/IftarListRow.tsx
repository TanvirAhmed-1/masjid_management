"use client";

import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useDeletedonernameMutation } from "@/src/redux/features/ramadan/itikafApi";
import EditRamadnModal from "./EditRamadnModal";
import { Doner, IftarListResponse } from "@/src/types/ramadanTypes";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import FetchingLoader from "@/src/components/shared/FetchingLoader";

type Props = {
  data?: any[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};
const IftarListTable: React.FC<Props> = ({
  data,
  isLoading,
  isFetching,
  page,
  limit,
}) => {
  const [removeIftar] = useDeletedonernameMutation();

  if (isLoading) return <LoaderScreen />;

  if (!data || data.length === 0) {
    return <p className="text-center py-6 text-gray-600">No Data Available</p>;
  }
  if (isFetching) return <FetchingLoader />;
  const rows =
    data?.flatMap((list: IftarListResponse) =>
      list.doners.map((doner: Doner) => ({
        ...doner,
        ramadanYear: list.ramadanyear?.ramadanYear ?? "-",
        ramadanyearId: list.ramadanyearId,
      })),
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
          <tr className="*:text-center *:px-4 *:py-3 *:whitespace-nowrap">
            <th>#</th>
            <th>Serial No</th>
            <th>Name</th>
            <th>Date</th>
            <th>Day</th>
            <th>Ramadan Year</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y bg-white">
          {rows.map((row: any, index: number) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 text-center *:px-4 *:py-3"
            >
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{row.serialNumber}</td>
              <td>{row.name}</td>
              <td>{format(new Date(row.iftarDate), "dd/MM/yyyy")}</td>
              <td>{row.dayName}</td>
              <td>{row.ramadanYear}</td>

              <td>
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
