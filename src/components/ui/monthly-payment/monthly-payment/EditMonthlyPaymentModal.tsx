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
import { useUpdatePaymentMutation } from "@/src/redux/features/monthly-salary/paymentApi";
import { useGetMembersQuery } from "@/src/redux/features/monthly-salary/memberApi";

type PaymentFormData = {
  memberId: string;
  monthKey: string;
  monthName: string;
  amount: number;
};

type EditMonthlyPaymentModalProps = {
  payment: PaymentFormData & { id: string };
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

const EditMonthlyPaymentModal = ({ payment }: EditMonthlyPaymentModalProps) => {
  const { data: members } = useGetMembersQuery(undefined, {
    skip: !payment.memberId,
  });
  const [updatePayment, { isLoading }] = useUpdatePaymentMutation();

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const selectedMonth = months.find((m) => m.key === data.monthKey);
      if (!selectedMonth) return alert("Invalid month selected");

      await updatePayment({
        id: payment.id,
        ...data,
        monthName: selectedMonth.name,
      }).unwrap();
      alert("Payment updated successfully!");
    } catch (error: any) {
      alert(error?.data?.message || "Error updating payment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          Edit Payment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Edit Monthly Payment
          </DialogTitle>
          <p className="text-sm text-gray-500">Update payment information</p>
        </DialogHeader>

        <FormProviderWrapper<PaymentFormData>
          onSubmit={onSubmit}
          defaultValues={payment}
        >
          <div className="space-y-4 mt-4">
            <RHFSelect
              label="Member"
              name="memberId"
              rules={{ required: "Member is required" }}
              options={
                members?.result?.map((m: any) => ({
                  value: m.id,
                  label: m.name,
                })) || []
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
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default EditMonthlyPaymentModal;
