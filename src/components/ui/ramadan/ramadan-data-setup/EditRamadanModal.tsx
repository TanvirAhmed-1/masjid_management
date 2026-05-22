"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import toast from "react-hot-toast";
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
import { FaEdit } from "react-icons/fa";
import { useUpdateRamadanYearMutation } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormData = {
  titleName: string;
  ramadanYear: string;
};

type ProntProps = {
  id: string;
  ramadanYear: string;
  titleName: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

function EditRamadanModal({ item }: { item: ProntProps }) {
  const [open, setOpen] = useState(false);
  const [updateYear, { isLoading }] = useUpdateRamadanYearMutation();
  const { t } = useTranslationContext();

  const onSubmit = async (data: FormData) => {
    try {
      await updateYear({ id: item.id, data }).unwrap();
      toast.success(t("ramadan_year_updated_success"));
      setOpen(false);
    } catch (error) {
      console.log("date create Error", error);
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
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {t("update_ramadan_year")}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {t("update_ramadan_year_desc")}
          </p>
        </DialogHeader>

        <FormProviderWrapper<FormData>
          onSubmit={onSubmit}
          defaultValues={{
            ramadanYear: item.ramadanYear,
            titleName: item.titleName,
          }}
        >
          <div className="space-y-4 mt-4">
            <RHFInput
              label={t("ramadan_year")}
              name="ramadanYear"
              placeholder={t("enter_ramadan_year")}
            />
            <RHFInput
              label={t("title_name")}
              name="titleName"
              placeholder={t("enter_participant_name")}
              rules={{ required: t("participant_name_required") }}
            />
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoading ? t("saving") : t("save")}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditRamadanModal;
