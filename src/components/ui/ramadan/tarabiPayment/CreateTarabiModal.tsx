"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/components/ui/dialog";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { useCreateTarabiPaymentMutation } from "@/src/redux/features/ramadan/tarabiPaymentApi";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import { useGetMembersQuery } from "@/src/redux/features/monthly-salary/memberApi";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";
type FormData = {
  memberId: string;
  ramadanYearId: string;
  amount: number;
  paidAmount: number;
};
function CreateTarabiModal() {
  const [open, setOpen] = useState(false);
  const [createPayment, { isLoading }] = useCreateTarabiPaymentMutation();

  // Fetching data
  const { data: membersData } = useGetMembersQuery(undefined);
  const { data: yearsData } = useGetRamadanYearQuery(undefined);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        amount: Number(data.amount),
        paidAmount: Number(data.paidAmount),
      };
      const result = await createPayment(payload).unwrap();
      toast.success(result.message || "Payment created successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create payment");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          <IoMdAdd className="mr-1" /> Add Tarabi Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-teal-700">
            New Tarabi Payment
          </DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <RHFSearchSelect
              label="Select Member (Hafez/Imam)"
              name="memberId"
              options={
                membersData?.result?.data?.map((m: any) => ({
                  label: m.name,
                  value: m.id,
                })) || []
              }
              rules={{ required: "Member is required" }}
            />
            <RHFSearchSelect
              label="Ramadan Year"
              name="ramadanYearId"
              options={
                yearsData?.result?.data?.map((y: any) => ({
                  label: `${y.titleName} (${y.ramadanYear})`,
                  value: y.id,
                })) || []
              }
              rules={{ required: "Year is required" }}
            />

            <RHFInput
              label="Tarabi Fee (৳)"
              name="amount"
              type="number"
              rules={{ required: "Amount is required" }}
            />
            <RHFInput
              label="Paid Amount (৳)"
              name="paidAmount"
              type="number"
              rules={{ required: "Amount is required" }}
            />
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading} className="bg-teal-600">
              Save
            </LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTarabiModal;
