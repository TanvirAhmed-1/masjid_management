"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { format } from "date-fns";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { useDeleteAccessoryPurchaseMutation } from "@/src/redux/features/monthly-salary/accessoryPurchase/accessoryPurchaseApi";
import EditAccessoryModal from "./EditAccessoryModal";

export interface AccessoryType {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  memberName?: string;
  createdAt: string;
  description?: string;
}

type Props = {
  data?: AccessoryType[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  limit: number;
};

const AccessoryTable: React.FC<Props> = ({
  data,
  isLoading,
  isError,
  page,
  limit,
}) => {
  const { confirm, success, error } = useConfirm();
  const [deleteAccessory] = useDeleteAccessoryPurchaseMutation();

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm("Delete this purchase record?");
    if (!isConfirmed) return;

    try {
      await deleteAccessory(id).unwrap();
      success("Record deleted successfully");
    } catch (err) {
      error("Failed to delete record");
    }
  };

  if (isLoading) return <LoaderScreen />;
  if (isError)
    return <p className="p-4 text-red-500 text-center">Error fetching data.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-4">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-teal-50">
          <tr className="*:px-4 *:py-3 *:whitespace-nowrap font-bold text-teal-900 border-b *:text-center">
            <th>SL</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Purchased By</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-green-50/30 transition-colors *:text-center"
              >
                <td>{(page - 1) * limit + index + 1}</td>
                <td className="font-medium text-slate-800">{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>৳{item.price.toLocaleString()}</td>
                <td className=" font-bold">
                  ৳{item.totalPrice.toLocaleString()}
                </td>
                <td>{item.memberName || "N/A"}</td>
                <td className=" text-xs">
                  {format(new Date(item.createdAt), "dd MMM, yyyy")}
                </td>
                <td className="flex justify-center gap-2 py-3">
                  <EditAccessoryModal accessory={item} />
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-rose-500 hover:bg-rose-600 text-white"
                    size="sm"
                  >
                    <FaTrashAlt size={14} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                No accessory purchases found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccessoryTable;
