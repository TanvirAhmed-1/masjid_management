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
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import {
  useCreateifterlistMutation,
  useUpdateifterlistMutation,
} from "@/src/redux/features/ramadan/iftarlist";
import toast from "react-hot-toast";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import { Doner } from "./IftarListRow";
import { FaEdit } from "react-icons/fa";

type FormData = {
  name: string;
  serialNumber: string;
  iftarDate: string;
  dayName: string;
};
type Props = {
  item: Doner;
};
function EditRamadnModal({ item }: Props) {
  const [updateIftar, { isLoading }] = useUpdateifterlistMutation();

  const onSubmit = async (data: FormData) => {
    const paypoad = {
      serialNumber: data.serialNumber,
      name: data.name,
      dayName: data.dayName,
      iftarDate: new Date(data.iftarDate).toISOString(),
      ifterListId: item.ifterListId,
    };

    console.log("Payload to send:", paypoad);
    try {
      const result = await updateIftar({ id: item.id, data: paypoad }).unwrap();
      console.log("Iftar list created successfully", result);
      toast.success("Iftar list Update successfully!");
    } catch (error: any) {
      console.log("Iftar creation error", error);
      toast.error(error?.data?.message || "Failed to create iftar list");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
        >
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full ">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            Update Ramadan Iftar List
          </DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<FormData>
          defaultValues={{
            name: item.name,
            serialNumber: item.serialNumber,
            iftarDate: item.iftarDate,
            dayName: item.dayName,
          }}
          onSubmit={onSubmit}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1  gap-3">
              <RHFInput
                name="serialNumber"
                placeholder="Enter Serial No"
                label="Serial Number"
              />
              <RHFInput name="name" placeholder="Enter Ename" label="Name" />
              <RHFDatePicker
                label="Iftar Date "
                name="iftarDate"
                placeholder="Enter Iftar Date"
                rules={{ required: "Iftar Date is required!" }}
              />

              <RHFInput
                name="dayName"
                placeholder="Enter Day Name"
                label="Day Name"
              />
            </div>
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

export default EditRamadnModal;
