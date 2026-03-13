"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import EditTarabiModal from "./EditTarabiModal";
import { useDeleteTarabiPaymentMutation } from "@/src/redux/features/ramadan/tarabiPaymentApi";


type Props = {
  data?: any[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  limit: number;
};

const TarabiTable: React.FC<Props> = ({
  data,
  isLoading,
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

  if (isLoading) return <LoaderScreen />;
  if (isError) return <p className="p-4 text-red-500">Error fetching data.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-4">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-teal-50">
          <tr className="*:px-4 *:py-3 *:whitespace-nowrap font-bold text-teal-900 border-b">
            <th className="text-center">SL</th>
            <th>Member Name</th>
            <th>Year</th>
            <th className="text-right">Amount</th>
            <th className="text-center">Date</th>
            <th>Description</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-green-50/40 transition-colors"
              >
                <td className="text-center">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="font-medium">{item.member?.name}</td>
                <td>{item.ramadanYear?.ramadanYear}</td>
                <td className="text-right font-bold text-teal-700">
                  ৳{item.amount.toLocaleString()}
                </td>
                <td className="text-center">
                  {format(new Date(item.payDate), "PPP")}
                </td>
                <td className="max-w-[200px] truncate">
                  {item.description || "N/A"}
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
                colSpan={7}
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
