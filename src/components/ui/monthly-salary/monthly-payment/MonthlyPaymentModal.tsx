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
import { useCreatePaymentMutation, useGetPaymentQuery } from "@/src/redux/features/monthly-salary/monthly-paymentApi";

type PaymentFormData = {
  memberId: string;
  monthKey: string;
  monthName: string;
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

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const selectedMonth = months.find((m) => m.key === data.monthKey);
      if (!selectedMonth) return alert("Invalid month selected");

      await createPayment({ ...data, monthName: selectedMonth.name }).unwrap();
      alert("Payment created successfully!");
    } catch (error: any) {
      alert(error?.data?.message || "Error creating payment");
    }
  };

  return (
    <Dialog>
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
            Select member, month, and enter amount
          </p>
        </DialogHeader>

        <FormProviderWrapper<PaymentFormData> onSubmit={onSubmit}>
          <div className="space-y-4 mt-4">
            <RHFSelect
              label="Member"
              name="memberId"
              rules={{ required: "Member is required" }}
              options={
                members?.result?.map((m: any) => ({ value: m.id, label: m.name })) || []
              }
            />
            <RHFSelect
              label="Month"
              name="monthKey"
              rules={{ required: "Month is required" }}
              options={months.map((m) => ({ value: m.key, label: m.name }))}
            />
            <RHFInput
              label="Amount"
              name="amount"
              placeholder="Enter amount"
              type="number"
              rules={{ required: "Amount is required", min: 1 }}
            />
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white"
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
