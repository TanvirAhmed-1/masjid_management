"use client";

import React from "react";
import { Button } from "../../button";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteRamadanYearMutation,
  useGetRamadanYearQuery,
} from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import EditRamadanModal from "./EditRamadanModal";
import Link from "next/link";
import ShowItikafListModal from "./ShowItikafListModal";

export interface RamadanData {
  id: string;
  ramadanYear: string;
  titleName: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const RamadanRow = () => {
  const { data: ramadanYear, isLoading } = useGetRamadanYearQuery(undefined);
  const [removeYear] = useDeleteRamadanYearMutation();

  if (isLoading) {
    return <p className="text-center py-6">Loading...</p>;
  }

  // delete the item

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
          const res = await removeYear(id).unwrap();

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

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full border-collapse text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr className="*:px-5 *:py-3 *:font-semibold *:text-center">
            <th>Serial No</th>
            <th>Year</th>
            <th>Title</th>
            <th>Iftar List</th>
            <th>Itikaf List</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {ramadanYear?.result?.map((item: RamadanData, index: number) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors *:px-5 *:py-3 *:text-center"
            >
              <td>{index + 1}</td>

              <td>{item.ramadanYear}</td>
              <td>{item.titleName}</td>
              <td>
                <Link href={`/ramadan-datasetup/${item.id}`}>
                  {" "}
                  <Button
                    size="sm"
                    className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded"
                  >
                    <FaEye size={14} />
                  </Button>
                </Link>
              </td>

              <td>
                <ShowItikafListModal id={item.id} />
              </td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  {/* Edit Button */}
                  <EditRamadanModal item={item} />

                  {/* Delete Button */}
                  <Button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2  shadow-sm transition-all duration-200"
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

export default RamadanRow;
