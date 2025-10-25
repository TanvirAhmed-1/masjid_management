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
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";

type ItikafFormData = {
  name: string;
  fromDate: string;
  toDate: string;
  ramadanYear: string;
};

function AddItikafModal() {
  const onSubmit = (data: ItikafFormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Dialog>
      {/* ✅ Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          Add Itikaf Participant
        </Button>
      </DialogTrigger>

      {/* ✅ Modal Content */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Add Participant for Ramadan I‘tikāf
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Fill in the details below to add a new I‘tikāf participant.
          </p>
        </DialogHeader>

        <FormProviderWrapper<ItikafFormData> onSubmit={onSubmit}>
          <div className="space-y-4 mt-4">
            <RHFInput
              label="Ramadan Year"
              name="ramadanYear"
              placeholder="Enter Ramadan year"
            />
            <RHFInput
              label="Participant Name"
              name="name"
              placeholder="Enter participant's name"
              rules={{ required: "Participant name is required" }}
            />
            <RHFDatePicker
              label="From Date"
              name="fromDate"
              placeholder="Select start date"
              rules={{ required: "Start date is required" }}
            />
            <RHFDatePicker
              label="To Date"
              name="toDate"
              placeholder="Select end date"
              rules={{ required: "End date is required" }}
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

export default AddItikafModal;
