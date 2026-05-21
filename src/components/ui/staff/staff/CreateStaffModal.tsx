"use client";

import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
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
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { useCreateStaffMutation } from "@/src/redux/features/staff/staffApi";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormData = {
  name: string;
  phone: string;
  role: string;
  baseSalary: number;
  joinDate: string;
  address: string;
  image?: FileList;
};

function CreateStaffModal() {
  const [open, setOpen] = useState(false);
  const [createStaff, { isLoading }] = useCreateStaffMutation();
  const [preview, setPreview] = useState<string | null>(null);
  const { t } = useTranslationContext();

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      joinDate: data.joinDate ? new Date(data.joinDate).toISOString() : undefined,
      baseSalary: Number(data.baseSalary),
      active: true,
    };
    try {
      const res = await createStaff(payload).unwrap();
      toast.success(res?.message || "Staff created successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create staff");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
          <IoMdAdd className="text-lg" />
          {t("add_new_staff")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[75vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("add_new_staff_member")}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{t("enter_staff_details")}</p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {/* Image Input with Preview */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">{t("staff_image")}</label>
              <input
                type="file"
                accept="image/*"
                className="p-2 border border-gray-300 rounded-md"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>

            <RHFInput name="name" label={t("full_name")} placeholder={t("enter_full_name")} />
            <RHFInput name="phone" label={t("phone_number")} placeholder={t("enter_phone_number")} />
            <RHFInput name="role" label={t("role_position")} placeholder={t("enter_staff_role")} />
            <RHFInput name="baseSalary" label={t("base_salary_bdt")} type="number" placeholder={t("enter_base_salary")} />
            <RHFDatePicker name="joinDate" label={t("joining_date")} placeholder={t("select_join_date")} />
            <RHFTextarea name="address" label={t("address")} placeholder={t("enter_full_address")} />
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
              {isLoading ? t("creating") : t("create_staff_btn")}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default CreateStaffModal;
