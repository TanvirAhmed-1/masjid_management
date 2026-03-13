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
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { useUpdateTarabiPaymentMutation } from "@/src/redux/features/ramadan/tarabiPaymentApi";

const EditTarabiModal = ({ payment }: { payment: any }) => {
  const [open, setOpen] = useState(false);
  const [updatePayment, { isLoading }] = useUpdateTarabiPaymentMutation();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        id: payment.id,
        body: {
          ...data,
          amount: Number(data.amount),
        },
      };
      await updatePayment(payload).unwrap();
      toast.success("Payment updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update payment");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-teal-600 border-teal-200 hover:bg-teal-50">
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-teal-700">Edit Tarabi Payment</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper onSubmit={onSubmit} defaultValues={payment}>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <RHFInput
              label="Amount (৳)"
              name="amount"
              type="number"
              rules={{ required: "Amount is required" }}
            />
            <RHFTextarea
              label="Description"
              name="description"
              rows={3}
            />
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading} className="bg-teal-600">Update</LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default EditTarabiModal;