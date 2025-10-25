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
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";

type FormData = {
  titleName: string;
  ramadanYear: string;
};

function RamadanModal() {
  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          Add Ramadan Year
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Create Ramadan  Year
          </DialogTitle>
          <p className="text-sm text-gray-500">
            input ramadan year and title like Ramadan (2026)
          </p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
          <div className="space-y-4 mt-4">
            <RHFInput
              label="Ramadan Year"
              name="ramadanYear"
              placeholder="Enter Ramadan year"
            />
            <RHFInput
              label="Title Name"
              name="titleName"
              placeholder="Enter participant's name"
              rules={{ required: "Participant name is required" }}
            />
           
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Save Participant
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default RamadanModal;

