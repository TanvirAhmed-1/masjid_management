"use client";

import React from "react";
import { Button } from "../../button";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import EditRamadanModal from "./EditRamadanModal";

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
  console.log("Ramadan Year", ramadanYear);

  if (isLoading) {
    return <p className="text-center py-6">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full border-collapse text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr className="*:px-5 *:py-3 *:font-semibold *:text-center">
            <th>Serial No</th>
            <th>Title</th>
            <th>Year</th>
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
              <td>{item.titleName}</td>
              <td>{item.ramadanYear}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  {/* View Button */}
                  <Button
                    type="button"
                    className="bg-teal-500 hover:bg-teal-600 text-white p-2  shadow-sm transition-all duration-200"
                    size="sm"
                    title="View"
                  >
                    <FaEye size={14} />
                  </Button>

                  {/* Edit Button */}
                  <EditRamadanModal item={item} />


                  {/* Delete Button */}
                  <Button
                    type="button"
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
