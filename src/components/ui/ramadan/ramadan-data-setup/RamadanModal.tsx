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
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useCreateRamadanYearMutation } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import toast from "react-hot-toast";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormData = {
  titleName: string;
  ramadanYear: string;
};

function RamadanModal() {
  const [open, setOpen] = useState(false);
  const [createYear, { isLoading }] = useCreateRamadanYearMutation();
  const { t } = useTranslationContext();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createYear(data).unwrap();
      toast.success(`${result.message}`);
      setOpen(false);
    } catch (error) {
      toast.error(t("ramadan_year_create_failed"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          {t("add_ramadan_year")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {t("create_ramadan_year")}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {t("input_ramadan_year_desc")}
          </p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
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

export default RamadanModal;
