"use client";

import { useState } from "react";
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
import { useCreateDonerMutation } from "@/src/redux/features/collection/collections";
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { IoMdAdd } from "react-icons/io";

type OthersCollectionForm = {
  name: string;
  amount: number;
};

function CreateDonerModal({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [createDoner, { isLoading }] = useCreateDonerMutation();

  const onSubmit = async (data: OthersCollectionForm) => {
    console.log("Payload:", data);
    const payload = {
      name: data.name,
      amount: Number(data.amount),
      collectionId: id,
    };
    try {
      await createDoner(payload).unwrap();
      toast.success("Doner created successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create Doner");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex items-center">
          <IoMdAdd className="mr-1" />
          Add Doner
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Doner</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<OthersCollectionForm> onSubmit={onSubmit}>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-4">
              <RHFInput
                label="Doner Name"
                name="name"
                placeholder="Enter Doner Name"
              />
              <RHFInput
                label="Doner Amount"
                name="amount"
                placeholder="Enter Doner Amount"
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading}>Create</LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDonerModal;
