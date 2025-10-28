"use client";

import React from "react";
import { Button } from "../../button";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import {
  useDeleteItikafMutation,
  useGetItikafQuery,
} from "@/src/redux/features/ramadan/itikafApi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import EditItikafModal from "./EditItikafModal";

interface RamadanData {
  ramadanYear: string;
  titleName: string;
}

export interface ItikafData {
  id: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  ramadanId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  ramadanYear: RamadanData;
}

const ItikafRow = () => {
  const { data: itikafs, isLoading } = useGetItikafQuery(undefined);
  const [removeItikaf] = useDeleteItikafMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Delete this Item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await removeItikaf(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Year has been deleted successfully.",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
          });

          console.log("Delete successfully", res);
        } catch (error) {
          Swal.fire({
            title: "Failed!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <p className="text-center py-6">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full border-collapse text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr className="*:px-5 *:py-3 *:font-semibold *:text-center">
            <th>Serial No</th>
            <th>Name</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {itikafs?.result?.map((itikaf: ItikafData, index: number) => (
            <tr
              key={itikaf.id}
              className="hover:bg-gray-50 transition-colors *:px-5 *:py-3 *:text-center"
            >
              <td>{index + 1}</td>
              <td>{itikaf.name}</td>
              <td>{itikaf.ramadanYear.ramadanYear}</td>
              <td className="space-x-3">
                <span>{format(new Date(itikaf.fromDate), "dd MMM yyyy")}</span>{" "}
                <span>to</span>{" "}
                <span>{format(new Date(itikaf.toDate), "dd MMM yyyy")}</span>
              </td>

              <td>
                <div className="flex justify-center items-center gap-2">


                  {/* Edit Button */}

                  <EditItikafModal item={itikaf} />


                  {/* Delete Button */}
                  <Button
                    type="button"
                    onClick={() => handleDelete(itikaf.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-sm transition-all duration-200"
                    size="sm"
                    title="Delete"
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

export default ItikafRow;
