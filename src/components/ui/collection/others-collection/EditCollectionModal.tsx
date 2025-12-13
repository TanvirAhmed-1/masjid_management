"use client";

import { useState, useEffect } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
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
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useUpdateCollectionMutation } from "@/src/redux/features/collection/collections";
import { useGetCollectionDataSetUpQuery } from "@/src/redux/features/collection/collectionDataSetUp";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { OtherCollectionType } from "./OthersCollectionContainer";
import LoadingButton from "@/src/components/shared/LoadingButton";

type Doner = {
  name: string;
  amount: number;
};

type OthersCollectionForm = {
  date: string;
  otherCollectionNameId: string;
  doners: Doner[];
  totalAmount: number;
};

function EditCollectionModal({
  data: collection,
}: {
  data: OtherCollectionType;
}) {
  const [open, setOpen] = useState(false);
  const { data } = useGetCollectionDataSetUpQuery(undefined);
  const [updateCollection, { isLoading }] = useUpdateCollectionMutation();

  const onSubmit = async (data: OthersCollectionForm) => {
    const payload = {
      otherCollectionNameId: data.otherCollectionNameId,
      date: new Date(data.date).toISOString(),
      donors: data?.doners?.map((d) => ({
        name: d.name,
        amount: Number(d.amount),
      })),
    };
    console.log("Payload:", payload);
    try {
      await updateCollection({ id: collection.id, data: payload }).unwrap();
      toast.success("Others Collection updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update Others Collection");
    }
  };

  const options = data?.data?.map((item: any) => ({
    value: item.id,
    label: item.title,
  }));

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
            otherCollectionNameId: collection.otherCollectionName.id,
            date: collection.date ?? new Date().toISOString(),
            doners: collection.donors.length
              ? collection.donors.map((d) => ({
                  name: d.name,
                  amount: d.amount,
                }))
              : [{ name: "", amount: 0 }],
          }}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-4">
              <RHFSelect
                label="Collection Type"
                name="otherCollectionNameId"
                placeholder="Select Collection Type"
                rules={{ required: "Collection Type is required!" }}
                options={options || []}
              />
              <RHFDatePicker
                label="Date"
                name="date"
                placeholder="Enter Date"
                rules={{ required: "Date is required!" }}
              />

              {/* Doner Fields */}
              <DonerFields />
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

function DonerFields() {
  const { control, setValue } = useFormContext<OthersCollectionForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "doners",
  });

  const doners = useWatch({ control, name: "doners" });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalSum =
      doners?.reduce((acc, curr) => acc + Number(curr.amount || 0), 0) || 0;
    setTotal(totalSum);
    setValue("totalAmount", totalSum);
  }, [doners, setValue]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-2 gap-3 items-end border p-3 rounded-md bg-gray-50 relative"
        >
          <RHFInput
            label="Doner Name"
            name={`doners.${index}.name`}
            placeholder="Enter Doner Name"
          />
          <RHFInput
            label="Amount"
            name={`doners.${index}.amount`}
            placeholder="Enter Amount"
          />

          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              title="Remove Doner"
            >
              <IoMdClose size={18} />
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <div className="mt-4 text-left font-semibold text-lg">
          Total Amount: <span className="text-teal-600">৳ {total}</span>
        </div>
        <button
          type="button"
          onClick={() => append({ name: "", amount: 0 })}
          className="text-teal-600 bg-teal-100 p-1 rounded-full hover:bg-teal-200 hover:text-teal-700 transition"
          title="Add Doner"
        >
          <IoMdAdd size={20} />
        </button>
      </div>
    </div>
  );
}

export default EditCollectionModal;
