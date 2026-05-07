"use client";

import React, { useMemo, useState } from "react";
import { format, isValid } from "date-fns";
import { User } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import Pagination from "@/src/components/shared/Pagination";
import { useGetAllMembersPaymentStatusQuery } from "@/src/redux/features/monthly-salary/paymentApi";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import PrintButton from "@/src/components/shared/PrintButton";
import YearlyPaymentPDF from "./form/YearlyPaymentPDF";
import toast from "react-hot-toast";

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

  const months = useMemo(() => {
    const yearNum = Number(year);
    if (!year || isNaN(yearNum)) return [];

    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(yearNum, i, 1);
      return {
        monthKey: `${year}-${String(i + 1).padStart(2, "0")}`,
        monthName: isValid(date) ? format(date, "MMM") : "N/A",
      };
    });
  }, [year]);

  const processedMembers = useMemo(() => {
    return members.map((member: any) => {
      const monthlyAmount = member.monthlyAmount || 0;
      const payments = member.payments || [];

      const totalPaid = payments.reduce(
        (sum: number, p: any) => sum + p.amount,
        0,
      );

      /** Find due months */
      const memberDueMonths = months.filter(
        (m) => !payments.some((p: any) => p.monthKey === m.monthKey),
      );

      const dueAmount = memberDueMonths.length * monthlyAmount;

      const monthCells = months.map((m) => {
        const payment = payments.find((p: any) => p.monthKey === m.monthKey);
        return {
          monthKey: m.monthKey,
          payment,
        };
      });

      return {
        ...member,
        totalPaid,
        dueMonths: memberDueMonths,
        dueAmount,
        monthCells,
      };
    });
  }, [members, months]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageSizeSelect
          value={limit}
          onChange={(val) => {
            setLimit(val);
            setPage(1);
          }}
        />

        <PrintButton
          data={{ result: members, year: year }}
          FormComponent={YearlyPaymentPDF}
          onBeforePrint={async () => {
            toast.loading("Preparing document for printing...");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.dismiss();
          }}
          documentTitle={`Yearly_Payment_History_${year}`}
        />
      </div>
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
            {isLoading ? (
              <tr>
                <td colSpan={17} className="py-10">
                  <LoaderScreen className="h-auto" />
                </td>
              </tr>
            ) : isError || !processedMembers.length ? (
              <tr>
                <td colSpan={17} className="py-10 text-center text-gray-500">
                  No payment data available for {year}
                </td>
              </tr>
            ) : (
              processedMembers.map((member: any) => (
                <tr key={member.id} className="border-b text-sm">
                  {/* MEMBER */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          {member.monthlyAmount}৳ / month
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="px-4 py-3 text-center">
                    {member.phone || "-"}
                  </td>

                  {/* MONTH CELLS */}
                  {member.monthCells.map((cell: any) => (
                    <td key={cell.monthKey} className="px-4 py-3 text-center">
                      {cell.payment ? (
                        <>
                          <span className="text-green-600 font-semibold">
                            {cell.payment.amount}৳
                          </span>
                          <p className="text-[10px] text-gray-500">
                            {format(
                              new Date(cell.payment.paidDate),
                              "dd MMM yyyy",
                            )}
                          </p>
                        </>
                      ) : (
                        <span className="text-red-500 font-semibold">—</span>
                      )}
                    </td>
                  ))}

                  {/* TOTAL PAID */}
                  <td className="px-4 py-3 text-center font-bold text-green-600">
                    {member.totalPaid}৳
                  </td>

                  {/* DUE MONTHS */}
                  <td className="px-4 py-3 text-center w-44">
                    {member.dueMonths.length === 0 ? (
                      <span className="text-green-600 font-semibold">
                        Clear
                      </span>
                    ) : (
                      <div>
                        <p className="font-bold text-[11px] text-red-600">
                          {member.dueMonths.length} month
                          {member.dueMonths.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-[11px] flex flex-wrap text-gray-500">
                          {member.dueMonths.map((m: any) => m.monthName).join(", ")}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* DUE AMOUNT */}
                  <td
                    className={`px-4 py-3 text-center font-bold ${
                      member.dueAmount > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {member.dueAmount > 0 ? `${member.dueAmount}৳` : "Clear"}
                  </td>
                </tr>
              ))
            )}
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
