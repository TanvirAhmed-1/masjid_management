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
import { useCreateItikafMutation } from "@/src/redux/features/ramadan/itikafApi";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import RHFSelect from "@/src/components/shared/RHFSelect";
import toast from "react-hot-toast";

type ItikafFormData = {
  name: string;
  fromDate: string;
  toDate: string;
  ramadanId: string;
};

function AddItikafModal() {
  const [createItikaf, { isLoading }] = useCreateItikafMutation();
  const { data: ramadanYear } = useGetRamadanYearQuery(undefined);

  const ramadanYearOptions =
    ramadanYear?.result?.data?.map((year: any) => ({
      value: year.id,
      label: year.ramadanYear,
    })) || [];
  const onSubmit = async (data: ItikafFormData) => {
    try {
      await toast.promise(createItikaf(data).unwrap(), {
        loading: "Creating Itikaf Participant...",
        success: "Itikaf Participant Created Successful!",
        error: "Itikaf Participant failed. Please check your credentials.",
      });
    } catch {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          Add Itikaf Participant
        </Button>
      </DialogTrigger>

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
            <RHFSelect
              label="Ramadan Year"
              name="ramadanId"
              placeholder="Enter Ramadan year"
              options={ramadanYearOptions}
              rules={{ required: "Ramadan year is required" }}
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
