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
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import { useCreateFridayCollectionMutation } from "@/src/redux/features/collection/fridayCollection";
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { useState } from "react";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";

type FridayCollectionForm = {
  amount: string;
  collectionDate: string;
};

export function AddFridayCollectionModal() {
  const [open, setOpen] = useState(false);
  const [createFridayCollection, { isLoading }] =
    useCreateFridayCollectionMutation();
  const onSubmit = async (data: FridayCollectionForm) => {
    const payload = {
      amount: parseInt(data.amount),
      collectionDate: data.collectionDate,
    };
    try {
      const result = await createFridayCollection(payload).unwrap();
      toast.success(`${result.message}`);
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create Friday Collection");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex justify-center items-center">
          <IoMdAdd />
          Add Friday-Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-sm max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle>Add Friday Collection</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<FridayCollectionForm> onSubmit={onSubmit}>
          <div className="space-y-3">
            <RHFDatePicker
              label="Collection Date"
              name="collectionDate"
              placeholder="Select Friday Date"
            />
            <RHFInput
              label="Amount"
              name="amount"
              placeholder="Enter Amount"
              rules={{ required: "Amount must be filled" }}
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton loadingText="Saving" isLoading={isLoading}>
              Save
            </LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}
