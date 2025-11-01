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
import { useUpdateMemberMutation } from "@/src/redux/features/monthly-salary/memberApi";


type MemberFormData = {
  name: string;
  phone?: string;
  address?: string;
  monthlyAmount: number;
};

type EditMemberModalProps = {
  member: MemberFormData & { id: string };
};

function EditMemberModal({ member }: EditMemberModalProps) {
  const [updateMember, { isLoading }] = useUpdateMemberMutation();

  const onSubmit = async (data: MemberFormData) => {
    try {
      const result = await updateMember({ id: member.id, ...data }).unwrap();
      console.log("Member updated successfully:", result);
    } catch (error) {
      console.log("Error updating member:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          Edit Member
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Edit Member
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Update member information
          </p>
        </DialogHeader>

        <FormProviderWrapper<MemberFormData> onSubmit={onSubmit} defaultValues={member}>
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
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditMemberModal;
