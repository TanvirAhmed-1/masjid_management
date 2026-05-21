"use client";
import { format } from "date-fns";
import { useDeletePaymentMutation } from "@/src/redux/features/monthly-salary/paymentApi";
import { Button } from "@/src/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import EditMonthlyPaymentModal from "./EditMonthlyPaymentModal";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { PaymentType } from "./MonthlyPaymentContainer";
import Swal from "sweetalert2";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type MonthlyPaymentTableProps = {
  data: PaymentType[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};

export default function MonthlyPaymentsTable({
  data,
  isLoading,
  isFetching,
  page,
  limit,
}: MonthlyPaymentTableProps) {
  const [deletePayment] = useDeletePaymentMutation();
  const { t } = useTranslationContext();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: t("confirm_title"),
      text: t("member_delete_warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("delete_confirm_btn"),
      cancelButtonText: t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePayment(id).unwrap();

          Swal.fire({
            title: t("deleted_success_title"),
            text: t("member_deleted_success_desc"),
            icon: "success",
            timer: 1200,
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
    <div className="bg-white rounded-lg shadow-xl border overflow-hidden">
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-teal-600 text-white">
              <tr className="*:text-center text-base *:p-3 *:font-semibold *:whitespace-nowrap">
                <th>#</th>
                <th>{t("member_name")}</th>
                <th>{t("phone")}</th>
                <th>{t("amount")}</th>
                <th>{t("paid_amount")}</th>
                <th>{t("paid_month")}</th>
                <th>{t("paid_date")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={8} className="py-10">
                    <LoaderScreen className="h-auto" />
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                data?.map((member: PaymentType, index: number) => (
                  <tr
                    key={member.id}
                    className="text-sm *:text-center *:py-2 *:px-3 hover:bg-gray-50 *:whitespace-nowrap"
                  >
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{member.member?.name || "-"}</td>
                    <td>{member.member?.phone || "-"}</td>
                    <td>{member.member?.monthlyAmount || "-"}</td>
                    <td>{member.amount}</td>
                    <td>{member.monthKey}</td>
                    <td>{format(new Date(member.paidDate), "dd-MM-yyyy")}</td>
                    <td>
                      <div className="flex justify-center items-center gap-2">
                        <EditMonthlyPaymentModal member={member} />

                        <Button
                          type="button"
                          onClick={() => handleDelete(member.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 shadow-sm transition-all duration-200"
                          size="sm"
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
      </>
    </div>
  );
}
