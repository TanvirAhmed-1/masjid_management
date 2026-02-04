"use client";

import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { User } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import Pagination from "@/src/components/shared/Pagination";
import { useGetAllMembersPaymentStatusQuery } from "@/src/redux/features/monthly-salary/paymentApi";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import LoaderScreen from "@/src/components/shared/LoaderScreen";

export default function YearlyPaymentHistory({ year }: { year: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetAllMembersPaymentStatusQuery({
    year,
    page,
    limit,
  });

  const members = data?.data?.result || [];
  const meta = data?.data?.meta;

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        monthKey: `${year}-${String(i + 1).padStart(2, "0")}`,
        monthName: format(new Date(Number(year), i), "MMM"),
      })),
    [year],
  );

  if (isLoading) return <LoaderScreen />;

  if (isError || !members.length) {
    return (
      <Card className="p-10 text-center text-gray-500">
        No payment data available for {year}
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageSizeSelect
        value={limit}
        onChange={(val) => {
          setLimit(val);
          setPage(1);
        }}
      />
      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border shadow-lg">
        <table className="w-full min-w-max">
          <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm">
            <tr>
              <th className="px-5 py-3 text-left">Member</th>
              <th className="px-5 py-3 text-center">Phone</th>

              {months.map((m) => (
                <th key={m.monthKey} className="px-4 py-3 text-center">
                  {m.monthName}
                </th>
              ))}

              <th className="px-5 py-3 text-center">Total Paid</th>
              <th className="px-5 py-3 text-center">Due Months</th>
              <th className="px-5 py-3 text-center">Due Amount</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member: any) => {
              const monthlyAmount = member.monthlyAmount;
              const payments = member.payments || [];

              const totalPaid = payments.reduce(
                (sum: number, p: any) => sum + p.amount,
                0,
              );

              /** Find due months */
              const dueMonths = months.filter(
                (m) => !payments.some((p: any) => p.monthKey === m.monthKey),
              );

              const dueAmount = dueMonths.length * monthlyAmount;

              return (
                <tr key={member.id} className="border-b text-sm">
                  {/* MEMBER */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          {monthlyAmount}৳ / month
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="px-4 py-3 text-center">
                    {member.phone || "-"}
                  </td>

                  {/* MONTH CELLS */}
                  {months.map((m) => {
                    const payment = payments.find(
                      (p: any) => p.monthKey === m.monthKey,
                    );

                    return (
                      <td key={m.monthKey} className="px-4 py-3 text-center">
                        {payment ? (
                          <>
                            <span className="text-green-600 font-semibold">
                              {payment.amount}৳
                            </span>
                            <p className="text-[10px] text-gray-500">
                              {format(
                                new Date(payment.paidDate),
                                "dd MMM yyyy",
                              )}
                            </p>
                          </>
                        ) : (
                          <span className="text-red-500 font-semibold">—</span>
                        )}
                      </td>
                    );
                  })}

                  {/* TOTAL PAID */}
                  <td className="px-4 py-3 text-center font-bold text-green-600">
                    {totalPaid}৳
                  </td>

                  {/* DUE MONTHS */}
                  <td className="px-4 py-3 text-center w-44">
                    {dueMonths.length === 0 ? (
                      <span className="text-green-600 font-semibold">
                        Clear
                      </span>
                    ) : (
                      <div>
                        <p className="font-bold text-[11px] text-red-600">
                          {dueMonths.length} month
                          {dueMonths.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-[11px] flex flex-wrap text-gray-500">
                          {dueMonths.map((m) => m.monthName).join(", ")}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* DUE AMOUNT */}
                  <td
                    className={`px-4 py-3 text-center font-bold ${
                      dueAmount > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {dueAmount > 0 ? `${dueAmount}৳` : "Clear"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        totalPage={meta?.totalPage ?? 1}
        totalRecords={meta?.total ?? 0}
        limit={limit}
        onPageChange={(p) => setPage(p)}
        onLimitChange={(l) => {
          setLimit(l);
          setPage(1);
        }}
      />
    </div>
  );
}
