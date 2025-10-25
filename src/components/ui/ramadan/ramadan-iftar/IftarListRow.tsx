"use client";

import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";

const IftarListRow = () => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full border-collapse text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr className="*:px-5 *:py-3 *:font-semibold *:text-center">
            <th>Serial No</th>
            <th>Date</th>
            <th>Name</th>
            <th>Purpose</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50 transition-colors *:px-5 *:py-3 *:text-center">
            <td>1</td>
            <td>10/12/2025</td>
            <td>Tanvir</td>
            <td>Mosjid nirmaner junno</td>

            <td>
              <div className="flex justify-center items-center gap-2">
                {/* View Button */}
                <Button
                  type="button"
                  className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg shadow-sm transition-all duration-200"
                  size="sm"
                  title="View"
                >
                  <FaEye size={14} />
                </Button>

                {/* Edit Button */}
                <Button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg shadow-sm transition-all duration-200"
                  size="sm"
                  title="Edit"
                >
                  <FaEdit size={14} />
                </Button>

                {/* Delete Button */}
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-sm transition-all duration-200"
                  size="sm"
                  title="Delete"
                >
                  <FaTrashAlt size={14} />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IftarListRow;
