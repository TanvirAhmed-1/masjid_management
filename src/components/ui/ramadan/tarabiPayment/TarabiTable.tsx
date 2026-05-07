"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import EditTarabiModal from "./EditTarabiModal";
import { useDeleteTarabiPaymentMutation } from "@/src/redux/features/ramadan/tarabiPaymentApi";
import FetchingLoader from "@/src/components/shared/FetchingLoader";

type Props = {
  data?: any[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};

const TarabiTable: React.FC<Props> = ({
  data,
  isLoading,
  isFetching,
  isError,
  page,
  limit,
}) => {
  const { confirm, success, error } = useConfirm();
  const [deletePayment] = useDeleteTarabiPaymentMutation();

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm(
      "Are you sure you want to delete this payment?",
    );
    if (!isConfirmed) return;

    try {
      await deletePayment(id).unwrap();
      success("Payment deleted successfully");
    } catch (err) {
      error("Failed to delete payment");
    }
  };


  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-4">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-teal-600 text-white">
          <tr className="*:px-4 *:py-3 *:whitespace-nowrap *:text-center font-bold border-b">
            <th>SL</th>
            <th>Member Name</th>
            <th>Phone</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Payment Amount</th>
            <th>Due Amount</th>
            <th>Dete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={9} className="py-10">
                <LoaderScreen className="h-auto" />
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={9} className="py-10 text-center text-red-500">
                Error fetching data.
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-green-50/40 transition-colors *:text-center"
              >
                <td className="text-center">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="font-medium">
                  {item.member?.name || "Unknown"}
                </td>
                <td className="font-medium">
                  {item.member?.phone || "Unknown"}
                </td>
                <td>
                  {item.ramadanYear?.titleName || item.ramadanYear?.ramadanYear}
                </td>
                <td className="text-right font-bold text-teal-700">
                  ৳{item.amount?.toLocaleString() ?? 0}
                </td>
                <td className="text-right font-bold text-teal-700">
                  ৳{item.paidAmount?.toLocaleString() ?? 0}
                </td>
                <td className=" text-red-400 truncate">
                  ৳{item.dueAmount?.toLocaleString() ?? 0}
                </td>
                <td className="text-center">
                  {item.payDate ? format(new Date(item.payDate), "PP") : "N/A"}
                </td>
                <td className="flex justify-center gap-2 py-3">
                  <EditTarabiModal payment={item} />
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white shadow-sm"
                    size="sm"
                  >
                    <FaTrashAlt size={14} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-10 text-center text-gray-500 font-medium"
              >
                No Tarabi payment records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TarabiTable;
