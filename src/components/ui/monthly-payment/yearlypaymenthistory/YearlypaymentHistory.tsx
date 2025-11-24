"use client";

import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Loader2, CheckCircle2, XCircle, User, DollarSign } from "lucide-react";
import { useGetAllMembersPaymentStatusQuery } from "@/src/redux/features/monthly-salary/paymentApi";
import { Card } from "@/src/components/ui/card";

// Define types
type Payment = {
  id: string;
  monthKey: string;
  amount: number;
};

type Member = {
  id: string;
  name: string;
  phone?: string;
  monthlyAmount: number;
  payments?: Payment[];
};

export default function YearlyPaymentHistory() {
  const [year] = useState("2025"); // Can be made dynamic later

  const { data, isLoading, isError } = useGetAllMembersPaymentStatusQuery(year);

  const members: Member[] = (data?.result as Member[]) || [];

  // Generate months for the year
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const monthNum = i + 1;
        const monthKey = `${year}-${String(monthNum).padStart(2, "0")}`;
        const monthName = format(new Date(Number(year), i), "MMM");
        return { monthKey, monthName };
      }),
    [year]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
        <span className="ml-4 text-lg">Loading yearly report...</span>
      </div>
    );
  }

  if (isError || !members.length) {
    return (
      <Card className="p-10 text-center text-gray-500">
        No data available for {year}
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-start gap-3">
          Yearly Payment History - {year}
        </h1>
        <p className="text-gray-600 mt-2 text-start">Complete overview of all members</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow-lg">
        <table className="w-full min-w-max">
          <thead className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
            <tr className="*:py-2">
              <th className="px-8 text-left font-semibold">Member</th>
              <th className="px-8 text-center">Phone</th>
              {months.map((m) => (
                <th key={m.monthKey} className="px-6 py-4 text-center text-sm">
                  {m.monthName}
                </th>
              ))}
              <th className="px-8 text-center font-bold">Total Paid</th>
              <th className="px-8 text-center font-bold">Due</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member: Member) => {
              const monthlyRate = member.monthlyAmount || 0;

              // Map payments by monthKey
              const paymentsMap = new Map<string, number>(
                member.payments?.map((p) => [p.monthKey, p.amount]) || []
              );

              // Total paid
              const paidTotal = Array.from(paymentsMap.values()).reduce(
                (sum: number, amt: number) => sum + amt,
                0
              );

              const expectedTotal = monthlyRate * 12;
              const dueAmount = expectedTotal - paidTotal;

              return (
                <tr
                  key={member.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Member Info */}
                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          Rate: {monthlyRate}৳/month
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-4 text-center text-sm text-gray-600">
                    {member.phone || "-"}
                  </td>

                  {/* 12 Months Status */}
                  {months.map((m) => {
                    const isPaid = paymentsMap.has(m.monthKey);
                    return (
                      <td key={m.monthKey} className="px-3 py-4 text-center">
                        {isPaid ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400 mx-auto" />
                        )}
                      </td>
                    );
                  })}

                  {/* Total Paid */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-green-600 text-lg">
                      {paidTotal}৳
                    </span>
                  </td>

                  {/* Due Amount */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`font-bold text-lg ${
                        dueAmount > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {dueAmount > 0 ? `${dueAmount}৳` : "Clear"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Grand Summary */}
      <Card className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-teal-100 text-sm">Total Members</p>
            <p className="text-base font-bold">{members.length}</p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">Total Expected</p>
            <p className="text-base font-bold">
              {members.reduce(
                (sum, m) => sum + m.monthlyAmount * 12,
                0
              )}
              ৳
            </p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">Total Collected</p>
            <p className="text-base font-bold">
              {members.reduce((sum, m) => {
                const paid =
                  m.payments?.reduce((s, p) => s + p.amount, 0) || 0;
                return sum + paid;
              }, 0)}
              ৳
            </p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">Total Due</p>
            <p className="text-base font-bold text-yellow-400">
              {members.reduce((sum, m) => {
                const expected = m.monthlyAmount * 12;
                const paid = m.payments?.reduce((s, p) => s + p.amount, 0) || 0;
                return sum + (expected - paid);
              }, 0)}
              ৳
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
