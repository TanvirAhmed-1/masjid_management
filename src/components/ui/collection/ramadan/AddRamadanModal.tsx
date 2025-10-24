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
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import { useFieldArray, useFormContext } from "react-hook-form";

type Doner = {
  serialNumber: string;
  iftarDate: string;
  name: string;
};

type OthersCollectionForm = {
  date: string;
  dayName: string;
  doners: Doner[];
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
          <DialogTitle>Create Ifter List</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<OthersCollectionForm>
          defaultValues={{
            date: "",
            dayName: "",
            doners: [{ serialNumber: "", iftarDate: "", name: "" }],
          }}
          onSubmit={onSubmit}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <RHFDatePicker
                label="Date"
                name="date"
                placeholder="Enter Date"
                rules={{ required: "Date is required!" }}
              />
              <RHFInput
                label="Day Name"
                name="dayName"
                placeholder="Enter day name"
                rules={{ required: "Day name is required!" }}
              />
            </div>

            <DonerFields />
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
  const { control } = useFormContext<OthersCollectionForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "doners",
  });

  return (
    <div className="space-y-4">
      <div className="font-semibold text-lg mb-2">Doner List</div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-3 gap-3 items-end border p-3 rounded-md bg-gray-50 relative"
        >
          <RHFInput
            label="Serial Number"
            name={`doners.${index}.serialNumber`}
            placeholder="Enter serial number"
            defaultValue={field.serialNumber}
          />

          <RHFDatePicker
            label="Iftar Date"
            name={`doners.${index}.iftarDate`}
            placeholder="Enter Iftar Date"
          />

          <RHFInput
            label="Name"
            name={`doners.${index}.name`}
            placeholder="Enter name"
            defaultValue={field.name}
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => append({ serialNumber: "", iftarDate: "", name: "" })}
          className="text-teal-600 bg-teal-100 px-3 py-2 rounded-md hover:bg-teal-200 hover:text-teal-700 transition flex items-center gap-1"
          title="Add Doner"
        >
          <IoMdAdd size={20} />
          Add Doner
        </button>
      </div>
    </div>
  );
}

export default AddOthersCollectionModal;