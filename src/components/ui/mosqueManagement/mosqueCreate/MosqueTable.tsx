"use client";

import { Button } from "@/src/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteMosqueMutation,
  useGetMosquesQuery,
} from "@/src/redux/features/mosqueManagement/mosqueApi";
import EditMosquemodal from "./EditMosquemodal";
import { MosqueType } from "./MosqueContainer";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

const MosqueTable = () => {
  const { data, isLoading, isError } = useGetMosquesQuery(undefined);
  const [deleteMosque] = useDeleteMosqueMutation();
  const { t } = useTranslationContext();

  const mosques = data?.data ?? [];

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: t("confirm_title"),
      text: t("mosque_delete_warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("delete_confirm_btn"),
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: t("cancel"),
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMosque(id).unwrap();
      Swal.fire({
        title: t("deleted_success_title"),
        text: t("mosque_deleted_success_desc"),
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: t("failed_title"),
        text: t("error_occurred"),
        icon: "error",
      });
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-600 text-white">
          <tr className="text-center text-sm font-medium *:py-3 *:px-3">
            <th>{t("serial_no")}</th>
            <th>{t("mosque_name")}</th>
            <th>{t("phone")}</th>
            <th>{t("address")}</th>
            <th>{t("admin_name")}</th>
            <th>{t("admin_email")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="py-10 text-center text-gray-500">
                {t("loading_mosques")}
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={7} className="py-10 text-center text-red-500">
                {t("failed_mosques")}
              </td>
            </tr>
          ) : mosques.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-10 text-center text-gray-500">
                {t("no_mosques")}
              </td>
            </tr>
          ) : (
            mosques.map((mosque: MosqueType, index: number) => {
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
                        title={t("delete")}
                      >
                        <FaTrashAlt size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MosqueTable;
