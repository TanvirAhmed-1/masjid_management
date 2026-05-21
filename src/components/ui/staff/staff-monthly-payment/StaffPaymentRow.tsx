"use client";

import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useDeleteStaffMutation } from "@/src/redux/features/staff/staffApi";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

export interface IMonthlySalary {
  id: string;
  month: string; 
  staffId: string;
  totalSalary: number;
  createdAt: string;
  updatedAt: string;
  mosqueId: string;
  userId: string;

  staff: IStaff;
  payments: ISalaryPayment[];
}

export interface IStaff {
  id: string;
  name: string;
  image: string | null;
  address: string;
  phone: string | null;
  role: string;
  baseSalary: number;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  mosqueId: string;
  userId: string;
}

export interface ISalaryPayment {
  id: string;
  amount: number;
  payDate: string;
  createdAt: string;
  salaryId: string;
  mosqueId: string;
  userId: string;
}

type Props = {
  data: IMonthlySalary[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};

const StaffPaymentRow: React.FC<Props> = ({
  data,
  isLoading,
  isFetching,
  page,
  limit,
}) => {
  const [deleteStaff] = useDeleteStaffMutation();
  const { t } = useTranslationContext();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: t("confirm_title"),
      text: t("error_occurred"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("delete_confirm_btn"),
      cancelButtonText: t("cancel"),
    });

    if (result.isConfirmed) {
      try {
        await deleteStaff(id).unwrap();
        Swal.fire(t("deleted_success_title"), "Staff removed successfully.", "success");
      } catch {
        Swal.fire(t("failed_title"), t("error_occurred"), "error");
      }
    }
  };

  return (
    <div className="w-full mx-auto overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-teal-600 text-white">
          <tr className="*:text-center *:px-2 *:py-3 *:whitespace-nowrap">
            <th>{t("sn")}</th>
            <th>{t("name")}</th>
            <th>{t("phone")}</th>
            <th>{t("amount")}</th>
            <th>{t("month")}</th>
            <th>{t("role")}</th>
            <th>{t("status")}</th> 
            <th>{t("salary")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>

        <tbody className="divide-y bg-white">
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={9} className="py-10">
                <LoaderScreen className="h-auto" />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-10 text-center text-gray-500">
                No Data Available
              </td>
            </tr>
          ) : (
            data?.map((row: IMonthlySalary, index) => (
              <tr key={row.id} className="hover:bg-gray-50 text-center *:p-2 *:whitespace-nowrap  ">
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{row.staff.name}</td>
                <td>{row.staff.phone}</td>
                <td>{row.totalSalary}</td>
                <td>{format(new Date(row?.month), "dd/MM/yyyy")}</td>
                <td>{row.staff.role}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.staff.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.staff.active ? t("active") : t("inactive")}
                  </span>
                </td>
                <td>{row.staff.baseSalary}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleDelete(row.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                      title={t("delete")}
                    >
                      <FaTrashAlt size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPaymentRow;
