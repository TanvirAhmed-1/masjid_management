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
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useUpdateItikafMutation } from "@/src/redux/features/ramadan/itikafApi";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import RHFSelect from "@/src/components/shared/RHFSelect";
import toast from "react-hot-toast";
import { ItikafData } from "./ItikafRow";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";

type ItikafFormData = {
  name: string;
  fromDate: string;
  toDate: string;
  ramadanId: string;
};

type props = {
  item: ItikafData;
};

function EditItikafModal({ item }: props) {
  const [updateItikaf, { isLoading }] = useUpdateItikafMutation();
  const { data: ramadanYear } = useGetRamadanYearQuery(undefined);

  const ramadanYearOptions =
    ramadanYear?.result?.map((year: any) => ({
      value: year.id,
      label: year.ramadanYear,
    })) || [];
  
  const onSubmit = async (data: ItikafFormData) => {
    try {
      // Convert date strings to ISO-8601 DateTime format with time set to start of day
      const formattedData = {
        name: data.name,
        ramadanId: data.ramadanId,
        fromDate: new Date(data.fromDate + "T00:00:00.000Z").toISOString(),
        toDate: new Date(data.toDate + "T00:00:00.000Z").toISOString(),
      };

      await toast.promise(updateItikaf({ id: item.id, data: formattedData }).unwrap(), {
        loading: "Updating Itikaf Participant...",
        success: "Itikaf Participant Updated Successfully!",
        error: "Update failed. Please try again.",
      });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg shadow-sm transition-all duration-200"
          size="sm"
          title="Edit"
        >
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Edit Participant for Ramadan I'tikāf
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Update the details below to edit the I'tikāf participant.
          </p>
        </DialogHeader>

        <FormProviderWrapper<ItikafFormData>
          onSubmit={onSubmit}
          defaultValues={{
            ramadanId: item?.ramadanId || "",
            name: item?.name || "",
            fromDate: item?.fromDate
              ? format(new Date(item.fromDate), "yyyy-MM-dd")
              : "",
            toDate: item?.toDate
              ? format(new Date(item.toDate), "yyyy-MM-dd")
              : "",
          }}
        >
          <div className="space-y-4 mt-4">
            <RHFSelect
              label="Ramadan Year"
              name="ramadanId"
              placeholder="Select Ramadan year"
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
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Participant"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditItikafModal;