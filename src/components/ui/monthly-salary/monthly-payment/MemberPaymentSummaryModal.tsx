"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { useGetMemberPaymentSummaryQuery } from "@/src/redux/features/monthly-salary/monthly-paymentApi";

type Props = {
  memberId: string;
  memberName: string;
};

const MemberPaymentSummaryModal = ({ memberId, memberName }: Props) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useGetMemberPaymentSummaryQuery(
    memberId,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View Summary
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {memberName} - Payment Summary
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {isLoading && <p>Loading summary...</p>}
          {isError && <p className="text-red-500">Failed to load summary</p>}
          {data && (
            <>
              <p>
                <strong>Monthly Amount:</strong>{" "}
                {data?.member?.monthlyAmount || 0} ৳
              </p>
              <p>
                <strong>Total Paid:</strong> {data?.totalPaidAmount || 0} ৳
              </p>
              <p>
                <strong>Due Amount:</strong> {data?.dueAmount || 0} ৳
              </p>
              <p>
                <strong>Paid Months:</strong>{" "}
                {data?.paidMonths?.length ? data?.paidMonths.join(", ") : "N/A"}
              </p>
              <p>
                <strong>Due Months:</strong>{" "}
                {data?.dueMonths?.length ? data?.dueMonths.join(", ") : "N/A"}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Payments History:</h3>
                <ul className="list-disc list-inside">
                  {data?.payments?.length ? (
                    data?.payments.map((p: any) => (
                      <li key={p.monthKey}>
                        {p.monthName}: {p.amount} ৳ (
                        {new Date(p.paidDate).toLocaleDateString()})
                      </li>
                    ))
                  ) : (
                    <li>No payments yet</li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberPaymentSummaryModal;
