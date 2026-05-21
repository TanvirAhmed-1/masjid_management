"use client";

import React from "react";
import { Button } from "../../button";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteRamadanYearMutation,
} from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import EditRamadanModal from "./EditRamadanModal";
import Link from "next/link";
import ShowItikafListModal from "./ShowItikafListModal";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

export interface RamadanData {
  id: string;
  ramadanYear: string;
  titleName: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

type Props = {
  data?: RamadanData[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};

const RamadanRow = ({ data, isLoading, isFetching, page, limit }: Props) => {
  const [removeYear] = useDeleteRamadanYearMutation();
  const { t } = useTranslationContext();

  if (isLoading || isFetching) {
    return (
      <div className="py-16 flex justify-center items-center">
        <LoaderScreen className="h-auto" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500 font-medium">
        No data available
      </p>
    );
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: t("confirm_title"),
      text: t("error_occurred"), // or customized warning
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("delete_confirm_btn"),
      cancelButtonText: t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeYear(id).unwrap();

          Swal.fire({
            title: t("deleted_success_title"),
            text: "Year has been deleted successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: t("failed_title"),
            text: t("error_occurred"),
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full border-collapse text-sm text-gray-700">
        <thead className="bg-teal-600 text-white">
          <tr className="*:px-5 *:py-3 *:font-semibold *:text-center  *:whitespace-nowrap">
            <th>{t("sn")}</th>
            <th>{t("year")}</th>
            <th>{t("title")}</th>
            <th>{t("iftar_list_col")}</th>
            <th>{t("itikaf_list_col")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data?.map((item: RamadanData, index: number) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors *:px-5 *:py-3 *:text-center *:whitespace-nowrap"
            >
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{item.ramadanYear}</td>
              <td>{item.titleName}</td>
              <td>
                <Link href={`/ramadan-datasetup/${item.id}`}>
                  {" "}
                  <Button
                    size="sm"
                    className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded"
                    title={t("view")}
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
                    title={t("delete")}
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
