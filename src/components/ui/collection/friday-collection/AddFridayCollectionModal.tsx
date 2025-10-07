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
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";

type FridayCollectionForm = {
  todayDate: string;
  amount: string;
  memberName: string;
  anotherMemberName: string;
};

export function AddFridayCollectionModal() {
  const onSubmit = (data: FridayCollectionForm) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex justify-center items-center">
          <IoMdAdd />
          Add Friday-Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3xl">
        <DialogHeader>
          <DialogTitle>Add Friday Collection</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<FridayCollectionForm> onSubmit={onSubmit}>
          <div className="">
            <RHFDatePicker
              label="Today Date"
              name="todayDate"
              placeholder="Enter Today Date"
              rules={{ required: "Father Name must be filled!" }}
            />
            <RHFInput
              label="Amount"
              name="amount"
              placeholder="Enter Amount"
              rules={{ required: "Amount must be filled" }}
            />
            <RHFInput
              label="Member Name"
              name="memberName"
              placeholder="Enter Member Name"
              rules={{ required: "Member Name must be filled!" }}
            />
            <RHFInput
              label="Another Member Name"
              name="anotherMemberName"
              placeholder="Enter Another Member Name"
            />
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
