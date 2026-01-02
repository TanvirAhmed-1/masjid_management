"use client";

import { Button } from "@/src/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteMosqueMutation,
  useGetMosquesQuery,
} from "@/src/redux/features/mosque/mosqueApi";
import EditMosquemodal from "./EditMosquemodal";
import { MosqueType } from "./MosqueContainer";


const MosqueTable = () => {
  const { data, isLoading, isError } = useGetMosquesQuery( undefined);
  const [deleteMosque] = useDeleteMosqueMutation();

  const mosques = data?.data ?? [];

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This mosque will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMosque(id).unwrap();
      Swal.fire({
        title: "Deleted!",
        text: "Mosque has been deleted successfully.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: "Failed!",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  };

  if (isLoading) return <div>Loading mosques...</div>;
  if (isError) return <div>Failed to load mosques</div>;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-center text-sm font-medium text-gray-900 *:py-2 *:px-3">
            <th>Serial No</th>
            <th>Mosque Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Admin Name</th>
            <th>Admin Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {mosques.map((mosque: MosqueType, index: number) => {
            const admin = mosque.users?.[0];

            return (
              <tr
                key={mosque.id}
                className="text-base text-center hover:bg-gray-50 *:py-2 *:px-3"
              >
                <td>{index + 1}</td>
                <td>{mosque.name}</td>
                <td>{mosque.phone || "-"}</td>
                <td>{mosque.address || "-"}</td>
                <td>{admin?.name || "-"}</td>
                <td>{admin?.email || "-"}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <EditMosquemodal mosque={mosque} />

                    <Button
                      size="sm"
                      onClick={() => handleDelete(mosque.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2"
                      title="Delete"
                    >
                      <FaTrashAlt size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}

          {mosques.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-500">
                No mosques found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MosqueTable;
