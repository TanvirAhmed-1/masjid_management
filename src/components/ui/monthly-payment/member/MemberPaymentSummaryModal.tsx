"use client";

import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  DollarSign,
  User,
  CheckCircle2,
  XCircle,
  Loader2,
  Calendar,
} from "lucide-react";
import { useGetMemberPaymentSummaryQuery } from "@/src/redux/features/monthly-salary/paymentApi";

type Payment = {
  id: string;
  monthKey: string; // YYYY-MM
  amount: number;
  paidDate: string;
};

type ApiResponse = {
  member: {
    id: string;
    name: string;
    phone?: string;
    monthlyAmount: number;
    joinDate?: string;
  };
  totalMonthsShouldPay: number;
  paidMonths: number;
  dueMonths: number;
  totalDue: number;
  paidMonthKeys: string[];
  payments: Payment[];
};

type Props = {
  memberId: string;
  memberName: string;
  trigger?: React.ReactNode;
};

export default function MemberPaymentSummaryModal({
  memberId,
  memberName,
  trigger,
}: Props) {
  const [open, setOpen] = useState(false);

  // ডাটা শুধু মডাল ওপেন হলে ফেচ হবে
  const { data, isLoading, isError } = useGetMemberPaymentSummaryQuery(memberId, {
    skip: !open,
  });

  const summary = data?.data as ApiResponse | undefined;

  // সব ক্যালকুলেশন মেমো করে রাখা
  const { totalPaid, dueMonthsList, monthlyBreakdown } = useMemo(() => {
    if (!summary) return { totalPaid: 0, dueMonthsList: [], monthlyBreakdown: [] };

    const monthlyRate = summary.member.monthlyAmount;

    // টোটাল পেইড
    const totalPaid = summary.payments.reduce((sum, p) => sum + p.amount, 0);

    // Due মাসগুলো নির্ণয় (Join থেকে আজ পর্যন্ত)
    const dueMonthsList: string[] = [];
    if (summary.member.joinDate) {
      const joinDate = new Date(summary.member.joinDate);
      const today = new Date();
      let year = joinDate.getFullYear();
      let month = joinDate.getMonth() + 1;
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const paidSet = new Set(summary.paidMonthKeys);

      while (year < currentYear || (year === currentYear && month <= currentMonth)) {
        const monthKey = `${year}-${String(month).padStart(2, "0")}`;
        if (!paidSet.has(monthKey)) {
          dueMonthsList.push(monthKey);
        }
        month++;
        if (month > 12) {
          month = 1;
          year++;
        }
      }
    }

    // মাসওয়ারি ব্রেকডাউন (সর্ট করা)
    const breakdown = summary.payments
      .slice()
      .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
      .map((p) => {
        const expected = monthlyRate;
        const paid = p.amount;
        const diff = paid - expected;
        return {
          monthKey: p.monthKey,
          paid,
          expected,
          diff,
          status: diff > 0 ? "excess" : diff < 0 ? "short" : "exact",
        };
      });

    return { totalPaid, dueMonthsList, monthlyBreakdown: breakdown };
  }, [summary]);

  const monthlyRate = summary?.member.monthlyAmount ?? 0;
  const totalExpected = (summary?.totalMonthsShouldPay ?? 0) * monthlyRate;
  const finalDue = totalExpected - totalPaid;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline">
            View Summary
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <User className="w-8 h-8 text-teal-600" />
            {memberName} - Payment Summary
          </DialogTitle>
        </DialogHeader>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-10 text-red-600 text-lg font-medium">
            Failed to load payment summary. Please try again.
          </div>
        )}

        {/* Main Content */}
        {summary && !isLoading && (
          <div className="space-y-6 mt-6">

            {/* Member Info */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
                <div>Monthly: <strong className="text-teal-700">{monthlyRate}৳</strong></div>
                <div>Join: <strong>{summary.member.joinDate ? format(new Date(summary.member.joinDate), "dd MMM yyyy") : "N/A"}</strong></div>
                <div>Total Should Pay: <strong>{summary.totalMonthsShouldPay} months</strong></div>
                <div>Paid Months: <strong className="text-green-600">{summary.paidMonthKeys.length}</strong></div>
              </div>
            </div>

            {/* Total Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-gray-600">Total Paid</p>
                <p className="text-3xl font-bold text-green-700">{totalPaid}৳</p>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Expected Amount</p>
                <p className="text-3xl font-bold text-blue-700">{totalExpected}৳</p>
              </div>

              <div className={`text-center p-6 rounded-xl border-2 ${finalDue <= 0 ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                {finalDue <= 0 ? <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" /> : <XCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />}
                <p className="text-gray-600">Final Status</p>
                <p className={`text-3xl font-bold ${finalDue <= 0 ? "text-emerald-700" : "text-red-700"}`}>
                  {finalDue <= 0 ? "All Clear" : `${finalDue}৳ Due`}
                </p>
              </div>
            </div>

            {/* Monthly Payment Details */}
            <div className="bg-white border rounded-xl overflow-hidden">
              <h3 className="font-bold text-lg p-4 bg-gray-50 border-b flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Monthly Payment Details
              </h3>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {monthlyBreakdown.length > 0 ? (
                  monthlyBreakdown.map((item) => (
                    <div key={item.monthKey} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="font-semibold text-lg">
                        {format(new Date(item.monthKey + "-01"), "MMMM yyyy")}
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Paid: <strong className="text-green-600">{item.paid}৳</strong></div>
                        <div className="text-xs text-gray-500">Expected: {item.expected}৳</div>
                      </div>
                      <div className="ml-6">
                        {item.diff > 0 && <Badge className="bg-emerald-100 text-emerald-800">+{item.diff}৳ Extra</Badge>}
                        {item.diff < 0 && <Badge variant="destructive">-{Math.abs(item.diff)}৳ Short</Badge>}
                        {item.diff === 0 && <Badge className="bg-blue-100 text-blue-800">Exact</Badge>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-10">No payments recorded yet</p>
                )}
              </div>
            </div>

            {/* Due Months List */}
            {dueMonthsList.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <XCircle className="w-6 h-6" /> Due Months ({dueMonthsList.length})
                </h4>
                <div className="flex flex-wrap gap-3">
                  {dueMonthsList.map((month) => (
                    <Badge key={month} variant="destructive" className="text-base py-2 px-4">
                      {format(new Date(month + "-01"), "MMM yyyy")} → {monthlyRate}৳
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}