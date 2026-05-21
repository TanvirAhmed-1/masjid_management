"use client";

import React, { useState } from "react";
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
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormData = {
  staffId: string;
  totalSalary: number;
  month: Date;
};

function AddStaffPaymentModal() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslationContext();
  const [monthlyPaymenttaff, { isLoading }] = useCreateStaffMonthlyPaymentMutation();
  const { data } = useGetStaffListQuery(undefined);

  const onSubmit = async (data: FormData) => {
    const payload = {
      staffId: data.staffId,
      totalSalary: Number(data.totalSalary),
      month: data.month,
    };
    try {
      const res = await monthlyPaymenttaff(payload).unwrap();
      toast.success(res?.message || "Staff payment created successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create staff payment");
    }
  };

  const staffOptions = data?.result?.data?.map((staff: any) => ({
    label: staff.name,
    value: staff.id,
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
          <IoMdAdd className="text-lg" />
          {t("staff_payment_btn")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("add_staff_payment")}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{t("fill_staff_payment")}</p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-5 mt-6">
            <RHFSearchSelect
              name="staffId"
              label={t("select_staff")}
              placeholder={t("search_select_staff")}
              options={staffOptions || []}
            />
            <RHFInput
              name="totalSalary"
              type="number"
              label={t("payment_amount_bdt")}
              placeholder={t("enter_payment_amount")}
            />
            <RHFDatePicker
              name="month"
              label={t("monthly_payment_label")}
              placeholder={t("select_payment_date")}
            />
          </div>

          <DialogFooter className="mt-8 flex justify-end gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[140px] bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? t("creating") : t("create_staff_payment")}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffPaymentModal;
