"use client";

import React, { useState } from "react";
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
  useUpdateifterlistMutation,
} from "@/src/redux/features/ramadan/iftarlist";
import toast from "react-hot-toast";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import { FaEdit } from "react-icons/fa";
import { Doner } from "@/src/types/ramadanTypes";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

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
  const [open, setOpen] = useState(false);
  const [updateIftar, { isLoading }] = useUpdateifterlistMutation();
  const { t } = useTranslationContext();

  const onSubmit = async (data: FormData) => {
    const paypoad = {
      serialNumber: data.serialNumber,
      name: data.name,
      dayName: data.dayName,
      iftarDate: new Date(data.iftarDate).toISOString(),
      ifterListId: item.ifterListId,
    };

    try {
      await updateIftar({ id: item.id, data: paypoad }).unwrap();
      toast.success(t("iftar_updated_success"));
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || t("iftar_create_failed"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
        >
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full md:max-w-xl overflow-hidden p-0 border-none shadow-2xl">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-white">
              {t("update_iftar_entry")}
            </DialogTitle>
            <p className="text-yellow-50/80 text-sm mt-1">{t("modify_donor_desc")}</p>
          </DialogHeader>
        </div>

        <FormProviderWrapper<FormData>
          defaultValues={{
            name: item.name,
            serialNumber: item.serialNumber,
            iftarDate: item.iftarDate,
            dayName: item.dayName,
          }}
          onSubmit={onSubmit}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 bg-gray-50/50">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-5">
              <RHFInput
                name="serialNumber"
                placeholder={t("enter_serial_no")}
                label={t("serial_number")}
                rules={{ required: t("serial_required") }}
              />
              <RHFInput 
                name="name" 
                placeholder={t("enter_donor_name")} 
                label={t("donor_name")} 
                rules={{ required: t("name_required") }}
              />
              <RHFDatePicker
                label={t("iftar_date")}
                name="iftarDate"
                placeholder={t("select_iftar_date")}
                rules={{ required: t("date_required") }}
              />
              <RHFSearchSelect
                label={t("day_name")}
                name="dayName"
                placeholder={t("select_day")}
                options={[
                  { value: "শনিবার", label: "শনিবার" },
                  { value: "রবিবার", label: "রবিবার" },
                  { value: "সোমবার", label: "সোমবার" },
                  { value: "মঙ্গলবার", label: "মঙ্গলবার" },
                  { value: "বুধবার", label: "বুধবার" },
                  { value: "বৃহস্পতিবার", label: "বৃহস্পতিবার" },
                  { value: "শুক্রবার", label: "শুক্রবার" },
                ]}
                rules={{ required: t("day_required") }}
              />
            </div>
          </div>

          <DialogFooter className="p-6 bg-white border-t flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="ghost" type="button" className="text-gray-500 hover:text-gray-700">
                {t("cancel")}
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 shadow-lg shadow-yellow-500/20 transition-all active:scale-95"
            >
              {isLoading ? t("updating_iftar") : t("update_entry")}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditRamadnModal;
