"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { useDeleteAccessoryPurchaseMutation } from "@/src/redux/features/monthly-salary/accessoryPurchase/accessoryPurchaseApi";
import EditAccessoryModal from "./EditAccessoryModal";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

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
  const { t } = useTranslationContext();

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

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-4">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-teal-600 text-white">
          <tr className="*:px-4 *:py-3 *:whitespace-nowrap font-bold border-b *:text-center">
            <th>{t("sn")}</th>
            <th>{t("accessory_name")}</th>
            <th>{t("qty")}</th>
            <th>{t("price")}</th>
            <th>{t("total")}</th>
            <th>{t("purchased_by")}</th>
            <th>{t("date")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={8} className="py-10">
                <LoaderScreen className="h-auto" />
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={8} className="py-10 text-center text-red-500">
                Error fetching data.
              </td>
            </tr>
          ) : data && data.length > 0 ? (
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
                    title={t("delete")}
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
