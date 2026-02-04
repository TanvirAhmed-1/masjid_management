"use client";
import { format } from "date-fns";
import { useDeletePaymentMutation } from "@/src/redux/features/monthly-salary/paymentApi";
import { Button } from "@/src/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import EditMonthlyPaymentModal from "./EditMonthlyPaymentModal";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { PaymentType } from "./MonthlyPaymentContainer";
import Swal from "sweetalert2";
import FetchingLoader from "@/src/components/shared/FetchingLoader";

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
  const [deletePayment, { isLoading: deleting }] = useDeletePaymentMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePayment(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Member has been deleted successfully.",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: "Failed!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <LoaderScreen />;
  }
  if (isFetching) {
    return <FetchingLoader />;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border overflow-hidden">
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr className="*:text-center *:p-2 *:font-bold *:text-gray-700">
                <th>#</th>
                <th>Member Name</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Paid Amount</th>
                <th>Paid Month</th>
                <th>Paid Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((member: PaymentType, index: number) => (
                <tr
                  key={member.id}
                  className="text-base *:text-center *:py-2 *:px-3 hover:bg-gray-50"
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
      </>
    </div>
  );
}
