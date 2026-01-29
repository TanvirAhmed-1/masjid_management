"use client";

import { IoMdAdd } from "react-icons/io";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useGetMembersQuery } from "@/src/redux/features/monthly-salary/memberApi";
import { useCreatePaymentMutation } from "@/src/redux/features/monthly-salary/paymentApi";
import toast from "react-hot-toast";
import { useState } from "react";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";

type PaymentFormData = {
  memberId: string;
  monthKey: string;
  amount: number;
};

const months = [
  { key: "2025-01", name: "January 2025" },
  { key: "2025-02", name: "February 2025" },
  { key: "2025-03", name: "March 2025" },
  { key: "2025-04", name: "April 2025" },
  { key: "2025-05", name: "May 2025" },
  { key: "2025-06", name: "June 2025" },
  { key: "2025-07", name: "July 2025" },
  { key: "2025-08", name: "August 2025" },
  { key: "2025-09", name: "September 2025" },
  { key: "2025-10", name: "October 2025" },
  { key: "2025-11", name: "November 2025" },
  { key: "2025-12", name: "December 2025" },
];

const MonthlyPaymentModal = () => {
  const { data: members } = useGetMembersQuery(undefined);
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const selectedMonth = months.find((m) => m.key === data.monthKey);

      if (!selectedMonth) {
        toast.error("Invalid month selection!");
        return;
      }

      const payload = {
        memberId: data.memberId,
        monthKey: data.monthKey,
        monthName: selectedMonth.name,
        amount: Number(data.amount),
      };

      await createPayment(payload).unwrap();

      toast.success(" Payment created successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || " Payment failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          Add Payment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Create Monthly Payment
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Select member, month & enter amount
          </p>
        </DialogHeader>

        <FormProviderWrapper onSubmit={onSubmit}>
          <div className="space-y-4 mt-4">
            <RHFSelect
              label="Member"
              name="memberId"
              rules={{ required: "Member is required" }}
              options={
                members?.result?.data?.map((m: any) => ({
                  value: m.id,
                  label: m.name,
                })) || []
              }
            />
            <RHFDatePicker
              label="Month"
              name="monthKey"
              placeholder="Select month"
              rules={{ required: "Month is required" }}
            />
            <RHFInput
              label="Amount"
              name="amount"
              placeholder="Enter amount"
              type="number"
              rules={{
                required: "Amount is required",
                min: { value: 1, message: "Minimum 1 taka" },
              }}
            />
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlyPaymentModal;
