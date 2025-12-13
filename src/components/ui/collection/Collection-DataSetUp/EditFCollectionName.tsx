"use client";

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
import { useUpdateFridayCollectionMutation } from "@/src/redux/features/collection/fridayCollection"; // changed to update
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { CollectionType } from "./CollectionTable";
import RHFTextarea from "@/src/components/shared/RHFTextarea";

type FridayCollectionForm = {
  title: string;
  description: string;
};

function EditFCollectionName({ collection }: { collection: CollectionType }) {
  const [open, setOpen] = useState(false);
  const [updateFridayCollection, { isLoading }] =
    useUpdateFridayCollectionMutation(); // use update mutation

  const onSubmit = async (data: FridayCollectionForm) => {
    try {
      await updateFridayCollection({
        id: collection.id,
        data: data,
      }).unwrap();
      toast.success("Friday Collection updated successfully");
      setOpen(false);
    } catch (error: any) {
      console.error("Error updating Friday Collection:", error);
      toast.error(error?.data?.message || "Failed to update Friday Collection");
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
      <DialogContent className="w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Friday Collection</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<FridayCollectionForm>
          onSubmit={onSubmit}
          defaultValues={{
            title: collection.title,
            description: collection.description,
          }}
        >
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

export default EditFCollectionName;
