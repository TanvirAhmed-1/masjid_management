"use client";

import React, { useMemo } from "react";
import { format } from "date-fns";
import { Loader2, User } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { useGetAllMembersPaymentStatusQuery } from "@/src/redux/features/monthly-salary/paymentApi";

type Payment = {
  id: string;
  monthKey: string;
  amount: number;
  paidDate?: string;
};

type Member = {
  id: string;
  name: string;
  phone?: string;
  monthlyAmount: number;
  payments?: Payment[];
  createdAt?: string;
};

export default function YearlyPaymentHistory({ year }: { year: string }) {
  const { data, isLoading, isError } = useGetAllMembersPaymentStatusQuery(year);
  console.log(data);
  const members: Member[] = data?.result || [];

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const monthNum = i + 1;
        const monthKey = `${year}-${String(monthNum).padStart(2, "0")}`;
        const monthName = format(new Date(Number(year), i), "MMM");
        return { monthKey, monthName };
      }),
    [year],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
        <span className="ml-4 text-lg">Loading...</span>
      </div>
    );
  }

  if (isError || !members.length) {
    return (
      <Card className="p-10 text-center text-gray-500">
        No payment data available for {year}
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-lg border shadow-lg">
        <table className="w-full min-w-max">
          <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm">
            <tr>
              <th className="px-5 py-3 text-left">Member</th>
              <th className="px-5 py-3 text-center">Phone</th>
              {months?.map((m) => (
                <th key={m.monthKey} className="px-4 py-3 text-center">
                  {m.monthName}
                </th>
              ))}
              <th className="px-5 py-3 text-center">Total</th>
              <th className="px-5 py-3 text-center">Due</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => {
              const monthly = member.monthlyAmount || 0;
              const payments = member.payments || [];

              const totalPaid = payments.reduce((s, p) => s + p.amount, 0);
              const expected = monthly * 12;
              const due = expected - totalPaid;

              return (
                <tr key={member.id} className="border-b text-sm">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          {monthly}৳ / month
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center text-gray-600">
                    {member.phone || "-"}
                  </td>

                  {months.map((m) => {
                    const payment = payments.find(
                      (p) => p.monthKey === m.monthKey,
                    );

                    if (payment) {
                      return (
                        <td key={m.monthKey} className="px-4 py-3 text-center">
                          <span className="text-green-600 text-sm font-semibold">
                            {payment.amount}৳
                          </span>
                          <p className="text-[8px] text-gray-900">
                            {payment.paidDate &&
                              format(new Date(payment.paidDate), "dd MMM yyyy")}
                          </p>
                        </td>
                      );
                    }

                    return (
                      <td key={m.monthKey} className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center text-red-500">
                          <span className="text-sm">{m.monthName}</span>
                        </div>
                      </td>
                    );
                  })}

                  <td className="px-4 py-3 text-center font-bold text-green-600">
                    {totalPaid}৳
                  </td>

                  <td
                    className={`px-4 py-3 text-center font-bold ${
                      due > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {due > 0 ? `${due}৳` : "Clear"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* summary */}
      <Card className="p-4 bg-gradient-to-r from-green-700 to-teal-700 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-sm opacity-80">Members</p>
            <p className="text-lg font-bold">{members.length}</p>
          </div>

          <div>
            <p className="text-sm opacity-80">Expected</p>
            <p className="text-lg font-bold">
              {members.reduce((sum, m) => sum + m.monthlyAmount * 12, 0)}৳
            </p>
          </div>

          <div>
            <p className="text-sm opacity-80">Collected</p>
            <p className="text-lg font-bold">
              {members.reduce(
                (sum, m) =>
                  sum + (m.payments?.reduce((s, p) => s + p.amount, 0) || 0),
                0,
              )}
              ৳
            </p>
          </div>

          <div>
            <p className="text-sm opacity-80">Due</p>
            <p className="text-lg font-bold text-yellow-300">
              {members.reduce((sum, m) => {
                const paid = m.payments?.reduce((s, p) => s + p.amount, 0) || 0;
                return sum + (m.monthlyAmount * 12 - paid);
              }, 0)}
              ৳
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
