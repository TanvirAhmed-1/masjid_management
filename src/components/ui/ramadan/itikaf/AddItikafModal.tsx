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
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useCreateItikafMutation } from "@/src/redux/features/ramadan/itikafApi";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import toast from "react-hot-toast";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type ItikafFormData = {
  name: string;
  fromDate: string;
  toDate: string;
  ramadanId: string;
};

function AddItikafModal() {
  const [open, setOpen] = useState(false);
  const [createItikaf, { isLoading }] = useCreateItikafMutation();
  const { data: ramadanYear } = useGetRamadanYearQuery(undefined);
  const { t } = useTranslationContext();

  const ramadanYearOptions =
    ramadanYear?.result?.data?.map((year: any) => ({
      value: year.id,
      label: year.ramadanYear,
    })) || [];

  const onSubmit = async (data: ItikafFormData) => {
    const payload = {
      ...data,
      fromDate: new Date(data.fromDate),
      toDate: new Date(data.toDate),
    };
    try {
      const res = await createItikaf(payload).unwrap();
      toast.success(res?.message || t("itikaf_created_success"));
      setOpen(false);
    } catch (error) {
      toast.error(t("itikaf_created_failed"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 font-medium">
          <IoMdAdd className="text-lg" />
          {t("add_itikaf_participant")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {t("add_itikaf_participant")}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {t("add_participant_itikaf_desc")}
          </p>
        </DialogHeader>

        <FormProviderWrapper<ItikafFormData> onSubmit={onSubmit}>
          <div className="space-y-4 mt-4">
            <RHFSearchSelect
              label={t("ramadan_year")}
              name="ramadanId"
              placeholder={t("enter_ramadan_year")}
              options={ramadanYearOptions}
              rules={{ required: t("ramadan_year") + " is required" }}
            />
            <RHFInput
              label={t("participant_name")}
              name="name"
              placeholder={t("enter_participant_name")}
              rules={{ required: t("participant_name_required") }}
            />
            <RHFDatePicker
              label={t("from_date")}
              name="fromDate"
              placeholder={t("select_start_date")}
              rules={{ required: t("from_date") + " is required" }}
            />
            <RHFDatePicker
              label={t("to_date")}
              name="toDate"
              placeholder={t("select_end_date")}
              rules={{ required: t("to_date") + " is required" }}
            />
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? t("saving") : t("save_participant")}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default AddItikafModal;
