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
import { useCreateifterlistMutation } from "@/src/redux/features/ramadan/ifterlist";

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

    try {
      const result = await createIftar(data).unwrap();
      console.log("date create succesfully", result);
    } catch (error) {
      console.log("date create Error", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white font-medium flex justify-center items-center gap-1">
          <IoMdAdd />
          Add Others Collection
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
              { serialNumber: "", iftarDate: "", name: "", dayName: "" },
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
                placeholder="Enter Ramadan Year"
                rules={{ required: "Ramadan Year is required!" }}
              />
              <div className="flex justify-center">
                <FcNumericalSorting21 className="size-10 animate-bounce ..."></FcNumericalSorting21>
              </div>
            </div>

            <DonerFields />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{isLoading ? "Saving..." : "Save"}</Button>
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
      <div className="font-semibold text-lg mb-2">Add Name List</div>

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
            placeholder="Enter Iftar Date"
            rules={{ required: "Iftar Date required" }}
          />
          <RHFInput
            label="Day Name"
            name={`doners.${index}.dayName`}
            placeholder="Enter Day Name"
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            append({ serialNumber: "", iftarDate: "", name: "", dayName: "" })
          }
          className="text-teal-600 font-medium bg-teal-100 px-3 py-2 rounded-md hover:bg-teal-200 hover:text-teal-700 transition flex items-center gap-1"
          title="Add Doner"
        >
          <IoMdAdd size={20} />
          Add
        </button>
      </div>
    </div>
  );
}

export default AddRamadanModal;
