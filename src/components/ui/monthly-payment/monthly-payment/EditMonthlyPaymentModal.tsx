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
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useUpdatePaymentMutation } from "@/src/redux/features/monthly-salary/paymentApi";
import { useGetMembersQuery } from "@/src/redux/features/monthly-salary/memberApi";
import { PaymentType } from "./MonthlyPaymentContainer";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";

type PaymentFormData = {
  memberId: string;
  monthKey: string;
  amount: number;
};

type Props = {
  member: PaymentType;
};

const EditMonthlyPaymentModal = ({ member }: Props) => {
  const { data: members } = useGetMembersQuery(undefined);
  const [updatePayment, { isLoading }] = useUpdatePaymentMutation();

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const payload = {
        memberId: data.memberId,
        monthKey: format(new Date(data.monthKey), "yyyy-MM"),
        amount: Number(data.amount),
      };
      console.log("Edit Payload", payload);
      const res = await updatePayment({
        id: member.id,
        data: payload,
      }).unwrap();
      toast.success(res?.message || "Payment updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Error updating payment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 shadow-sm transition-all duration-200"
          size="sm"
          title="Edit"
        >
          <Edit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Monthly Payment</DialogTitle>
          <p className="text-sm text-gray-500">Update payment information</p>
        </DialogHeader>

        <FormProviderWrapper<PaymentFormData>
          onSubmit={onSubmit}
          defaultValues={{
            memberId: member.member.name,
            monthKey: member.monthKey,
            amount: member.amount,
          }}
        >
          <div className="space-y-4 mt-4">
            <RHFSelect
              label="Member"
              placeholder="Select member"
              name="memberId"
              options={
                members?.result?.data?.map((m: any) => ({
                  value: m.id,
                  label: m.name,
                })) || []
              }
            />

            <RHFDatePicker label="Month" name="monthKey" />

            <RHFInput label="Amount" name="amount" type="number" />
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              disabled={isLoading}
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
