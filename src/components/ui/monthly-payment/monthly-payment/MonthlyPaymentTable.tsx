"use client";
import { format } from "date-fns";
import { Loader2, Trash2, Edit, Calendar } from "lucide-react";
import { useDeletePaymentMutation } from "@/src/redux/features/monthly-salary/paymentApi";
import { Button } from "@/src/components/ui/button";
import toast from "react-hot-toast";

type MonthlyPaymentTableProps = {
  data: any;
  isLoading: boolean;
  isError: boolean;
  selectedMonth: string;
};
export default function MonthlyPaymentsTable({
  data,
  isLoading,
  isError,
  selectedMonth,
}: MonthlyPaymentTableProps) {
  const [deletePayment, { isLoading: deleting }] = useDeletePaymentMutation();

  const monthData = data?.data;
  const payments = monthData?.payments || [];
  const totalAmount = monthData?.totalAmount || 0;
  const totalPaidMembers = monthData?.totalMembersPaid || 0;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this payment?")) return;

    try {
      await deletePayment(id).unwrap();
      toast.success("Payment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete payment");
    }
  };

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg">
        Failed to load data. Please try again.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border overflow-hidden">
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          <span className="ml-3 text-lg text-gray-600">
            Loading payments...
          </span>
        </div>
      )}

      {/* Table */}
      {!isLoading && (
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
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment: any, index: number) => (
                    <tr
                      key={payment.id}
                      className="border-b hover:bg-teal-50/30 transition-colors *:text-center *:text-sm *:p-2 *:font-medium *:text-gray-800"
                    >
                      <td>{index + 1}</td>
                      <td>{payment.member?.name || "Unknown Member"}</td>
                      <td>{payment.member?.phone || "-"}</td>
                      <td className=" font-bold text-teal-600">
                        {payment.amount}৳
                      </td>
                      <td>
                        {format(new Date(payment.paidDate), "dd MMM yyyy")}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Button size="sm" variant="outline" className="p-0.5">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="p-0.5"
                            onClick={() => handleDelete(payment.id)}
                            disabled={deleting}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-500">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">
                        No payments recorded for{" "}
                        {format(new Date(selectedMonth + "-01"), "MMMM yyyy")}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          {payments.length > 0 && (
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <p className="text-teal-100 text-sm">Members Paid</p>
                  <p className="text-sm font-bold">{totalPaidMembers}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-teal-100 text-sm">Total Collection</p>
                  <p className="text-sm font-bold">{totalAmount}৳</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-teal-100 text-sm">Average Amount</p>
                  <p className="text-sm font-bold">
                    {totalPaidMembers > 0
                      ? Math.round(totalAmount / totalPaidMembers)
                      : 0}
                    ৳
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
