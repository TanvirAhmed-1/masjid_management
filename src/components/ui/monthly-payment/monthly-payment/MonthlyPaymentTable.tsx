"use client";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import { useDeletePaymentMutation } from "@/src/redux/features/monthly-salary/paymentApi";
import { Button } from "@/src/components/ui/button";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import EditMonthlyPaymentModal from "./EditMonthlyPaymentModal";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { PaymentType } from "./MonthlyPaymentContainer";

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
    if (!confirm("Are you sure you want to delete this payment?")) return;

    try {
      await deletePayment(id).unwrap();
      toast.success("Payment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete payment");
    }
  };
  if (isLoading) {
    return <LoaderScreen />;
  }
  if (isFetching) {
    return <LoaderScreen />;
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
                  <td>{member.amount}</td>
                  <td>{format(new Date(member.paidDate), "dd-MM-yyyy")}</td>
                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        type="button"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 shadow-sm transition-all duration-200"
                        size="sm"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </Button>

                      {/* <EditMonthlyPaymentModal member={member} /> */}

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
