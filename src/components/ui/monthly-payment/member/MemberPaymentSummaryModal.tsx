"use client";

import React, { useState } from "react";
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
import { DollarSign, User, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useGetMemberPaymentSummaryQuery } from "@/src/redux/features/monthly-salary/paymentApi";

// Define types
type Payment = {
  id: string;
  memberId: string;
  monthKey: string;
  amount: number;
  paidDate: string;
};

type MemberSummary = {
  member: {
    id: string;
    name: string;
    phone?: string;
    monthlyAmount: number;
    joinDate?: string;
  };
  totalMonthsShouldPay: number;
  paidMonths: Payment[];
  dueMonths: string[]; // monthKeys
  totalDue: number;
  paidMonthKeys: string[];
  totalPaidAmount: number;
  dueAmount: number;
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

  const { data, isLoading, isError } = useGetMemberPaymentSummaryQuery(memberId, {
    skip: !open,
  });

  const summary: MemberSummary | undefined = data?.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline">
            View Summary
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <User className="w-7 h-7 text-teal-600" />
            {memberName} - Payment Summary
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
          </div>
        )}

        {isError && (
          <div className="text-center py-10 text-red-600">
            Failed to load summary. Please try again.
          </div>
        )}

        {summary && !isLoading && (
          <div className="space-y-6 mt-4">
            {/* Member Info */}
            <div className="bg-gray-50 p-5 rounded-lg border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Monthly Amount:</strong> {summary.member.monthlyAmount}৳
                </div>
                <div>
                  <strong>Join Date:</strong>{" "}
                  {summary.member.joinDate
                    ? format(new Date(summary.member.joinDate), "dd MMM yyyy")
                    : "N/A"}
                </div>
                <div>
                  <strong>Total Months Should Pay:</strong> {summary.totalMonthsShouldPay}
                </div>
                <div>
                  <strong>Paid Months:</strong> {summary.paidMonths.length || 0}
                </div>
              </div>
            </div>

            {/* Total Summary Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                <DollarSign className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="text-gray-600">Total Paid</p>
                <p className="text-3xl font-bold text-green-700">
                  {summary.totalPaidAmount || 0}৳
                </p>
              </div>
              <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                <XCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <p className="text-gray-600">Total Due</p>
                <p className="text-3xl font-bold text-red-700">
                  {summary.dueAmount > 0 ? `${summary.dueAmount}৳` : "Clear"}
                </p>
              </div>
            </div>

            {/* Paid Months */}
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Paid Months ({summary.paidMonths.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {summary.paidMonths.length > 0 ? (
                  summary.paidMonthKeys.map((monthKey) => (
                    <Badge
                      key={monthKey}
                      className="bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      {format(new Date(monthKey + "-01"), "MMMM yyyy")}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">No payments recorded</span>
                )}
              </div>
            </div>

            {/* Due Months */}
            {summary.dueMonths.length > 0 && (
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-3 text-red-700">
                  <XCircle className="w-5 h-5" />
                  Due Months ({summary.dueMonths.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {summary.dueMonths.map((monthKey) => (
                    <Badge key={monthKey} variant="destructive">
                      {format(new Date(monthKey + "-01"), "MMMM yyyy")}
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
