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
import { FcNumericalSorting21 } from "react-icons/fc";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { useCreateifterlistMutation } from "@/src/redux/features/ramadan/iftarlist";
import toast from "react-hot-toast";


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
  const [createIftar, { isLoading }] = useCreateifterlistMutation();
  const { data: ramadanYear } = useGetRamadanYearQuery(undefined);

  const ramadanYearOptions =
    ramadanYear?.result?.map((year: any) => ({
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
    } catch (error: any) {
      console.log("Iftar creation error", error);
      toast.error(error?.data?.message || "Failed to create iftar list");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white font-medium flex justify-center items-center gap-1">
          <IoMdAdd />
          Add Iftar List
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full md:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            Create Iftar List
          </DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<OthersCollectionForm>
          defaultValues={{
            ramadanYear: "",
            doners: [
              { serialNumber: "1", iftarDate: "", name: "", dayName: "" },
            ],
          }}
          onSubmit={onSubmit}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <RHFSelect
                options={ramadanYearOptions}
                label="Ramadan Year"
                name="ramadanYear"
                placeholder="Select Ramadan Year"
                rules={{ required: "Ramadan Year is required!" }}
              />
              <div className="flex justify-center items-center">
                <FcNumericalSorting21 className="size-10 animate-bounce" />
              </div>
            </div>

            <DonerFields />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
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
      dayName: "" 
    });
  };

  return (
    <div className="space-y-4">
      <div className="font-semibold text-lg mb-2">Add Doner List</div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end border p-3 rounded-md bg-gray-50 relative"
        >
          <RHFInput
            label="Serial Number"
            name={`doners.${index}.serialNumber`}
            placeholder="Enter serial number"
            defaultValue={field.serialNumber}
            rules={{ required: "Serial number required" }}
          />
          <RHFInput
            label="Name"
            name={`doners.${index}.name`}
            placeholder="Enter name"
            defaultValue={field.name}
            rules={{ required: "Name required" }}
          />
          <RHFDatePicker
            label="Iftar Date"
            name={`doners.${index}.iftarDate`}
            placeholder="Select Iftar Date"
            rules={{ required: "Iftar Date required" }}
          />
          <RHFInput
            label="Day Name"
            name={`doners.${index}.dayName`}
            placeholder="e.g., Monday"
            defaultValue={field.dayName}
            rules={{ required: "Day name is required!" }}
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

      {fields.length < 31 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddDoner}
            className="text-teal-600 font-medium bg-teal-100 px-3 py-2 rounded-md hover:bg-teal-200 hover:text-teal-700 transition flex items-center gap-1"
            title="Add Doner"
          >
            <IoMdAdd size={20} />
            Add Doner
          </button>
        </div>
      )}

      {fields.length >= 31 && (
        <p className="text-sm text-red-500 text-right">
          Maximum 31 doners allowed for this Ramadan year
        </p>
      )}
    </div>
  );
}

export default AddRamadanModal;