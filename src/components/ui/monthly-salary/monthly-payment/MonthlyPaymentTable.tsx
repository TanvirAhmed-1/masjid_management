// "use client";

// import React from "react";
// import { Button } from "@/src/components/ui/button";
// import {
//   useDeletePaymentMutation,
//   useGetPaymentQuery,
// } from "@/src/redux/features/monthly-salary/monthly-paymentApi";
// import EditMonthlyPaymentModal from "./EditMonthlyPaymentModal";
// import toast from "react-hot-toast";

// const MonthlyPaymentTable = () => {
//   const { data: payments, isLoading, isError } = useGetPaymentQuery(undefined);
//   const [deletePayment, { isLoading: isDeleting }] = useDeletePaymentMutation();

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this payment?")) return;

//     try {
//       await deletePayment(id).unwrap();
//       toast.success("Payment deleted successfully!");
//     } catch (error: any) {
//       console.error("Error deleting payment:", error);
//       toast.error(error?.data?.message || "Failed to delete payment");
//     }
//   };

//   if (isLoading) return <div className="p-4">Loading payments...</div>;
//   if (isError)
//     return <div className="p-4 text-red-500">Failed to load payments</div>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200 border">
//         <thead className="bg-gray-50">
//           <tr className="*:px-4 *:py-2 *:text-center">
//              <th>#</th>
//             <th>Member Name</th>
//             <th>Month</th>
//             <th>Amount</th>
//             <th>Paid Date</th>
//             <th >Actions</th>
//           </tr>
//         </thead>

//         <tbody className="bg-white divide-y divide-gray-200">
//           {payments?.result?.map((payment: any,  index: number) => (
//             <tr key={payment.id} className="*:px-4 *:py-2 *:text-center">
//               <td>{index+1}</td>
//               <td>{payment.member?.name || "Unknown"}</td>
//               <td>{payment.monthName}</td>
//               <td>{payment.amount} ৳</td>
//               <td>
//                 {payment.paidDate
//                   ? new Date(payment.paidDate).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })
//                   : "-"}
//               </td>
//               <td className="px-4 py-2 flex justify-center gap-2">
//                 <EditMonthlyPaymentModal payment={payment} />
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => handleDelete(payment.id)}
//                   disabled={isDeleting}
//                 >
//                   {isDeleting ? "Deleting..." : "Delete"}
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {!payments?.result?.length && (
//         <div className="p-4 text-center text-gray-500">No payments found</div>
//       )}
//     </div>
//   );
// };

// export default MonthlyPaymentTable;

"use client";

import { useState } from "react";
import { Loader2, Trash2, Edit, Calendar } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import {
  useDeletePaymentMutation,
  useGetMonthlyPaymentsQuery,
} from "@/src/redux/features/monthly-salary/monthly-paymentApi";
import { Badge } from "../../badge";

const months = [
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-05",
  "2025-06",
  "2025-07",
  "2025-08",
  "2025-09",
  "2025-10",
  "2025-11",
  "2025-12",
];

export default function MonthlyPaymentsTable() {
  const [monthKey, setMonthKey] = useState("2025-01");

  const { data, isLoading } = useGetMonthlyPaymentsQuery(monthKey);
  const [deletePayment] = useDeletePaymentMutation();

  const handleDelete = async (id: string) => {
    const confirmation = confirm(
      "Are you sure you want to delete this payment?"
    );
    if (!confirmation) return;

    await deletePayment(id);
  };

  return (
    <div className="p-6 bg-card rounded-xl border shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Monthly Payments
        </h2>

        {/* Month Selector */}
        <Select
          onValueChange={(value) => setMonthKey(value)}
          defaultValue={monthKey}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted text-left">
                <th className="p-3 border">Member</th>
                <th className="p-3 border">Month</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.data?.length > 0 ? (
                data.data.map((payment: any) => (
                  <tr key={payment._id} className="hover:bg-muted/40">
                    <td className="p-3 border">{payment?.member?.name}</td>
                    <td className="p-3 border">{payment?.monthKey}</td>
                    <td className="p-3 border">{payment?.amount} ৳</td>

                    {/* Status Badge */}
                    <td className="p-3 border">
                      {payment.status === "paid" ? (
                        <Badge className="bg-green-600 hover:bg-green-700">
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Unpaid</Badge>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3 border flex justify-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => handleDelete(payment._id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-5 text-muted-foreground"
                  >
                    No payments found for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
