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
import { useUpdateDonerCollectionMutation } from "@/src/redux/features/collection/collections";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { Donor } from "./ManageCollectionContainer";

type OthersCollectionForm = {
  name: string;
  amount: number;
};

function EditDonerCollection({ data: collection }: { data: Donor }) {
  const [open, setOpen] = useState(false);
  const [updateCollection, { isLoading }] = useUpdateDonerCollectionMutation();

  const onSubmit = async (data: OthersCollectionForm) => {
    console.log("Payload:", data);
    try {
      await updateCollection({ id: collection.id, data: data }).unwrap();
      toast.success("Others Collection updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update Others Collection");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 shadow-sm transition-all duration-200"
          size="sm"
          title="Edit"
        >
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<OthersCollectionForm>
          onSubmit={onSubmit}
          defaultValues={{
            name: collection.name,
            amount: collection.amount,
          }}
        >
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
            <LoadingButton isLoading={isLoading}>Save</LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditDonerCollection;
