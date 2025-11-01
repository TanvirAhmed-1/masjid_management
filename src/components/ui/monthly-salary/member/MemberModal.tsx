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
import { useCreateMemberMutation } from "@/src/redux/features/monthly-salary/memberApi";

type MemberFormData = {
  name: string;
  phone?: string;
  address?: string;
  monthlyAmount: number;
};

function MemberModal() {
  const [createMember, { isLoading }] = useCreateMemberMutation();

  const onSubmit = async (data: MemberFormData) => {
    console.log("Form Submitted:", data);
    try {
      const result = await createMember(data).unwrap();
      console.log("Member created successfully:", result);
    } catch (error) {
      console.log("Error creating member:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          Add Member
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Create Member
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Input member information like name, phone, address, monthly amount
          </p>
        </DialogHeader>

        <FormProviderWrapper<MemberFormData> onSubmit={onSubmit}>
          <div className="space-y-4 mt-4">
            <RHFInput
              label="Name"
              name="name"
              placeholder="Enter member name"
              rules={{ required: "Member name is required" }}
            />
            <RHFInput
              label="Phone"
              name="phone"
              placeholder="Enter phone number"
            />
            <RHFInput
              label="Address"
              name="address"
              placeholder="Enter address"
            />
            <RHFInput
              label="Monthly Amount"
              name="monthlyAmount"
              placeholder="Enter monthly amount"
              type="number"
              rules={{ required: "Monthly amount is required", min: 1 }}
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
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default MemberModal;
