"use client";

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
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

type Doner = {
  donerName: string;
  amount: number;
};

type OthersCollectionForm = {
  date: string;
  description: string;
  doners: Doner[];
  totalAmount: number;
};

function AddOthersCollectionModal() {
  const onSubmit = (data: OthersCollectionForm) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex justify-center items-center">
          <IoMdAdd className="mr-1" />
          Add Others Collection
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Others Collection</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<OthersCollectionForm>
          defaultValues={{
            date: "",
            description: "",
            doners: [{ donerName: "", amount: 0 }],
            totalAmount: 0,
          }}
          onSubmit={onSubmit}
        >
          <div className=" p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-4">
              <RHFDatePicker
                label="Date"
                name="date"
                placeholder="Enter Date"
                rules={{ required: "Date is required!" }}
              />

              <RHFTextarea
                label="Description"
                name="description"
                placeholder="Enter Description"
              />

              {/* Dynamic Doner Fields */}
              <DonerFields />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
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
      {/* Doner Fields */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-2 gap-3 items-end border p-3 rounded-md bg-gray-50 relative"
        >
          <RHFInput
            label="Doner Name"
            name={`doners.${index}.donerName`}
            placeholder="Enter Doner Name"
          />
          <RHFInput
            label="Amount"
            type="number"
            name={`doners.${index}.amount`}
            placeholder="Enter Amount"
          />

          {/* Remove Icon (Only if more than one field) */}
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
          onClick={() => append({ donerName: "", amount: 0 })}
          className="text-teal-600 bg-teal-100 p-1 rounded-full hover:bg-teal-200 hover:text-teal-700 transition"
          title="Add Doner"
        >
          <IoMdAdd size={20} />
        </button>
      </div>
    </div>
  );
}

export default AddOthersCollectionModal;
