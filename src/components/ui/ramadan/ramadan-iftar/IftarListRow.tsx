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


  const rows =
    data?.flatMap((list: IftarListResponse) =>
      list.doners.map((doner: Doner) => ({
        ...doner,
        ramadanYear: list.ramadanyear?.ramadanYear ?? "-",
        ramadanyearId: list.ramadanyearId,
      })),
    ) || [];



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
    <div className=" overflow-x-auto">
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
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={7} className="py-10">
                <LoaderScreen className="h-auto" />
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-10 text-center text-gray-500">
                No Data Available
              </td>
            </tr>
          ) : (
            rows.map((row: any, index: number) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IftarListTable;
