"use client";

import React from "react";

import { Button } from "@/src/components/ui/button";
import { useDeletePaymentMutation, useGetPaymentQuery } from "@/src/redux/features/monthly-salary/monthly-paymentApi";
import EditMonthlyPaymentModal from "./EditMonthlyPaymentModal";


const MonthlyPaymentTable = () => {
  const { data: payments, isLoading, isError } = useGetPaymentQuery(undefined);
  const [deletePayment] = useDeletePaymentMutation();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this payment?")) {
      try {
        await deletePayment(id).unwrap();
        alert("Payment deleted successfully");
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  if (isLoading) return <div>Loading payments...</div>;
  if (isError) return <div>Failed to load payments</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Member Name</th>
            <th className="px-4 py-2 text-left">Month</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Paid Date</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments?.result?.map((payment: any) => (
            <tr key={payment.id}>
              <td className="px-4 py-2">{payment.member?.name}</td>
              <td className="px-4 py-2">{payment.monthName}</td>
              <td className="px-4 py-2">{payment.amount}</td>
              <td className="px-4 py-2">
                {new Date(payment.paidDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <EditMonthlyPaymentModal payment={payment} />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(payment.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyPaymentTable;
