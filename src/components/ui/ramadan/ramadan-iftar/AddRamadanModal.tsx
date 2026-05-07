"use client";

import React, { useState } from "react";
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
import { FcNumericalSorting21 } from "react-icons/fc";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import { useCreateifterlistMutation } from "@/src/redux/features/ramadan/iftarlist";
import toast from "react-hot-toast";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";

type Doner = {
  serialNumber: string;
  iftarDate: string;
  name: string;
  dayName: string;
};

type OthersCollectionForm = {
  ramadanYear: string;
  doners: Doner[];
};

function AddRamadanModal() {
  const [open, setOpen] = useState(false);
  const [createIftar, { isLoading }] = useCreateifterlistMutation();
  const { data: ramadanYear } = useGetRamadanYearQuery(undefined);

  const ramadanYearOptions =
    ramadanYear?.result?.data?.map((year: any) => ({
      value: year.id,
      label: year.ramadanYear,
    })) || [];

  const onSubmit = async (data: OthersCollectionForm) => {
    console.log("Form Submitted:", data);

    const payload = {
      ramadanyearId: data.ramadanYear,
      doners: data.doners.map((item) => ({
        serialNumber: item.serialNumber,
        name: item.name,
        iftarDate: new Date(item.iftarDate).toISOString(),
        dayName: item.dayName.charAt(0).toUpperCase() + item.dayName.slice(1),
      })),
    };

    console.log("Payload to send:", payload);

    try {
      const result = await createIftar(payload).unwrap();
      console.log("Iftar list created successfully", result);
      toast.success("Iftar list created successfully!");
      setOpen(false);
    } catch (error: any) {
      console.log("Iftar creation error", error);
      toast.error(error?.data?.message || "Failed to create iftar list");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white font-medium flex justify-center items-center gap-1">
          <IoMdAdd />
          Add Iftar List
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full md:max-w-2xl overflow-hidden p-0 border-none shadow-2xl">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-white">
              Create Iftar List
            </DialogTitle>
            <p className="text-teal-50/80 text-sm mt-1">Add donors for the Ramadan iftar schedule</p>
          </DialogHeader>
        </div>

        <FormProviderWrapper<OthersCollectionForm>
          defaultValues={{
            ramadanYear: "",
            doners: [
              { serialNumber: "1", iftarDate: "", name: "", dayName: "" },
            ],
          }}
          onSubmit={onSubmit}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 bg-gray-50/50">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <RHFSearchSelect
                options={ramadanYearOptions}
                label="Ramadan Year"
                name="ramadanYear"
                placeholder="Select Ramadan Year"
                rules={{ required: "Ramadan Year is required!" }}
              />
            </div>

            <DonerFields />
          </div>

          <DialogFooter className="p-6 bg-white border-t flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="ghost" type="button" className="text-gray-500 hover:text-gray-700">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 shadow-lg shadow-teal-600/20 transition-all active:scale-95"
            >
              {isLoading ? "Saving..." : "Save Iftar List"}
            </Button>
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

  // Auto-generate serial numbers
  const handleAddDoner = () => {
    const nextSerial = (fields.length + 1).toString();
    append({
      serialNumber: nextSerial,
      iftarDate: "",
      name: "",
      dayName: "",
    });
  };
  const dayOptions = [
    { value: "শনিবার", label: "শনিবার" },
    { value: "রবিবার", label: "রবিবার" },
    { value: "সোমবার", label: "সোমবার" },
    { value: "মঙ্গলবার", label: "মঙ্গলবার" },
    { value: "বুধবার", label: "বুধবার" },
    { value: "বৃহস্পতিবার", label: "বৃহস্পতিবার" },
    { value: "শুক্রবার", label: "শুক্রবার" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          Donor List
          <span className="bg-teal-100 text-teal-700 text-xs py-0.5 px-2 rounded-full">{fields.length}</span>
        </h3>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="group relative bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <RHFInput
                    label="SN"
                    name={`doners.${index}.serialNumber`}
                    placeholder="No"
                    defaultValue={field.serialNumber}
                    rules={{ required: "Req" }}
                  />
                </div>
                <div className="col-span-2">
                  <RHFInput
                    label="Donor Name"
                    name={`doners.${index}.name`}
                    placeholder="Full Name"
                    defaultValue={field.name}
                    rules={{ required: "Name req" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <RHFDatePicker
                  label="Iftar Date"
                  name={`doners.${index}.iftarDate`}
                  placeholder="Select Date"
                  rules={{ required: "Date req" }}
                />
                <RHFSearchSelect
                  label="Day"
                  name={`doners.${index}.dayName`}
                  placeholder="Day"
                  defaultValue={field.dayName}
                  options={dayOptions}
                  rules={{ required: "Day req" }}
                />
              </div>
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute -top-2 -right-2 bg-white border border-red-100 text-red-500 rounded-full p-1.5 shadow-sm hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                title="Remove Doner"
              >
                <IoMdClose size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {fields.length < 31 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleAddDoner}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-dashed border-teal-200 text-teal-600 font-semibold hover:bg-teal-50 hover:border-teal-300 transition-all active:scale-95 group"
            title="Add Doner"
          >
            <IoMdAdd size={20} className="group-hover:rotate-90 transition-transform" />
            Add Another Donor
          </button>
        </div>
      )}

      {fields.length >= 31 && (
        <p className="text-xs text-red-500 text-center font-medium">
          Maximum 31 donors allowed for this Ramadan year
        </p>
      )}
    </div>
  );
}


export default AddRamadanModal;
