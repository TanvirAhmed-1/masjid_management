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
import { useGetStaffListQuery } from "@/src/redux/features/staff/staffApi";
import { useCreateStaffMonthlyPaymentMutation } from "@/src/redux/features/staff/staffMonthlyPayment";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";

type FormData = {
  staffId: string;
  totalSalary: number;
  month: Date;
};

function AddStaffPaymentModal() {
  const [monthlyPaymenttaff, { isLoading }] =
    useCreateStaffMonthlyPaymentMutation();
  const { data } = useGetStaffListQuery(undefined);
  const onSubmit = async (data: FormData) => {
    const payload = {
      staffId: data.staffId,
      totalSalary: Number(data.totalSalary),
      month: data.month,
    };
    console.log("Payload to send:", payload);
    try {
      const res = await monthlyPaymenttaff(payload).unwrap();
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
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
          <IoMdAdd className="text-lg" />
          Staff Payment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Staff Payment
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Please fill in the form below to add a new staff payment.
          </p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
          <div className="grid grid-cols-1  gap-5 mt-6">
            <RHFSearchSelect
              name="staffId"
              label="Select Staff"
              placeholder="Search and select staff"
              options={staffOptions || []}
            />
            <RHFInput
              name="totalSalary"
              type="number"
              label="Payment Amount (BDT)"
              placeholder="Enter payment amount"
            />
            <RHFDatePicker
              name="month"
              label="Monthly Payment"
              placeholder="Select payment date"
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
