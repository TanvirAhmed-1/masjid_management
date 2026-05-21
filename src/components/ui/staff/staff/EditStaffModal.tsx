"use client";

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
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import { useUpdateStaffMutation } from "@/src/redux/features/staff/staffApi";
import { IStaff } from "./StaffRow";
import { Edit } from "lucide-react";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormData = {
  name: string;
  phone: string;
  role: string;
  status?: string;
  baseSalary: number;
  joinDate: Date | null;
  address: string;
  image?: FileList;
};

type Props = { staff: IStaff };

function EditStaffModal({ staff }: Props) {
  const [open, setOpen] = useState(false);
  const [updateStaff, { isLoading }] = useUpdateStaffMutation();
  const [preview, setPreview] = useState<string | null>(staff.image ?? null);
  const { t } = useTranslationContext();

  const defaultValues = {
    name: staff.name,
    phone: staff.phone ?? "",
    role: staff.role,
    baseSalary: staff.baseSalary,
    joinDate: staff.joinDate ? new Date(staff.joinDate) : undefined,
    address: staff.address,
  };

  const onSubmit = async (formData: FormData) => {
    const payload = {
      ...formData,
      joinDate: formData.joinDate ? new Date(formData.joinDate).toISOString() : undefined,
      baseSalary: Number(formData.baseSalary),
    };
    try {
      const res = await updateStaff({ id: staff.id, data: payload }).unwrap();
      toast.success(res?.message || "Staff updated successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update staff");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 shadow-sm transition-all duration-200"
          size="sm"
          title={t("edit")}
        >
          <Edit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("edit_staff_member")}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{t("update_staff_info")}</p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit} defaultValues={defaultValues}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {/* Image */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">{t("staff_image_edit")}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              {preview && (
                <img src={preview} alt="preview" className="mt-2 w-32 h-32 object-cover rounded-md border" />
              )}
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
              {isLoading ? t("updating") : t("update_staff_btn")}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditStaffModal;
