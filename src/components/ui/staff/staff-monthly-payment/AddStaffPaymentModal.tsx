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
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { useCreateStaffPaymentMutation } from "@/src/redux/features/staff/StaffPayments";
import { useGetStaffListQuery } from "@/src/redux/features/staff/staffApi";

type FormData = {
  name: string;
  phone: string;
  role: string;
  baseSalary: number;
  joinDate: string;
  address: string;
  image?: FileList;
};

function AddStaffPaymentModal() {
  const [createStaff, { isLoading }] = useCreateStaffPaymentMutation();
  const { data } = useGetStaffListQuery(undefined);
  const onSubmit = async (data: FormData) => {
    try {
      const res = await createStaff(data).unwrap();
      toast.success(res?.message || "Staff payment created successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create staff payment");
    }
  };

  const staffOptions = data?.result?.data?.map((staff: any) => ({
    label: staff.name,
    value: staff.id,
  }));
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <IoMdAdd className="text-lg" />
          Add New Staff
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Staff Member
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Enter the staff details below to add them to the system.
          </p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <RHFInput
              name="amount"
              label="Payment Amount (BDT)"
              placeholder="Enter payment amount"
            />

            <RHFDatePicker
              name="payDate"
              label="Payment Date"
              placeholder="Select payment date"
            />
            <RHFSelect
              name="staffId"
              label="Select Staff"
              options={staffOptions || []}
            />
          </div>

          <DialogFooter className="mt-8 flex justify-end gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[140px] bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Creating..." : "Create Staff"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffPaymentModal;
