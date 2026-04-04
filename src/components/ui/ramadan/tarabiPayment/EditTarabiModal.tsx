"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/components/ui/dialog";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { useUpdateTarabiPaymentMutation } from "@/src/redux/features/ramadan/tarabiPaymentApi";
type FromData = {
  amount: number;
};
const EditTarabiModal = ({ payment }: { payment: any }) => {
  const [open, setOpen] = useState(false);
  const [updatePayment, { isLoading }] = useUpdateTarabiPaymentMutation();

  const onSubmit = async (data: FromData) => {
    try {
      const payload = {
        amount: Number(data.amount),
      };
      await updatePayment({ id: payment.id, body: payload }).unwrap();
      toast.success("Payment updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update payment");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg shadow-sm transition-all duration-200"
          size="sm"
          title="Edit"
        >
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-teal-700">
            Edit Tarabi Payment
          </DialogTitle>
        </DialogHeader>

        <FormProviderWrapper onSubmit={onSubmit} defaultValues={payment}>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <RHFInput
              label="Amount (৳)"
              name="amount"
              type="number"
              rules={{ required: "Amount is required" }}
            />
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading} className="bg-teal-600">
              Update
            </LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default EditTarabiModal;
