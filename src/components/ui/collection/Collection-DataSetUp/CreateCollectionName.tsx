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
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { useState } from "react";
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { useCreateCollectionDataSetUpMutation } from "@/src/redux/features/collection/collectionDataSetUp";

type FridayCollectionForm = {
  title: string;
  description: string;
};

function CreateCollectionName() {
  const [open, setOpen] = useState(false);
  const [createCollection, { isLoading }] =
    useCreateCollectionDataSetUpMutation();
  const onSubmit = async (data: FridayCollectionForm) => {
    console.log("Form Submitted:", data);
    try {
      await createCollection(data).unwrap();
      toast.success(" Collection Name created successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create  Collection Name");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex justify-center items-center">
          <IoMdAdd />
          Add Collection Name
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3xl">
        <DialogHeader>
          <DialogTitle>Create Collection Name</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<FridayCollectionForm> onSubmit={onSubmit}>
          <div>
            <RHFInput
              label=" Collection title"
              name="title"
              placeholder="Masjid Development Collection 2025"
              rules={{ required: "Collection title is required" }}
            />
            <RHFTextarea
              label="Description"
              name="description"
              placeholder="Masjid Development Collection 2025"
              rows={4}
              rules={{ required: "Description is required" }}
            />
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

export default CreateCollectionName;
