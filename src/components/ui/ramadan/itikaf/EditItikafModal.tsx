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
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useUpdateItikafMutation } from "@/src/redux/features/ramadan/itikafApi";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import RHFSelect from "@/src/components/shared/RHFSelect";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { ItikafData } from "./ItikafContainer";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type ItikafFormData = {
  name: string;
  fromDate: string;
  toDate: string;
  ramadanId: string;
};
type props = {
  item: ItikafData;
};
function EditItikafModal({ item }: props) {
  const [open, setOpen] = useState(false);
  const [updateItikaf, { isLoading }] = useUpdateItikafMutation();
  const { data: ramadanYear } = useGetRamadanYearQuery(undefined);
  const { t } = useTranslationContext();

  const ramadanYearOptions =
    ramadanYear?.result?.data?.map((year: any) => ({
      value: year.id,
      label: year.ramadanYear,
    })) || [];

  const onSubmit = async (data: ItikafFormData) => {
    try {
      // Convert date strings to ISO-8601 DateTime format with time set to start of day
      const formattedData = {
        name: data.name,
        ramadanId: data.ramadanId,
        fromDate: new Date(data.fromDate + "T00:00:00.000Z").toISOString(),
        toDate: new Date(data.toDate + "T00:00:00.000Z").toISOString(),
      };

      await toast.promise(
        updateItikaf({ id: item.id, data: formattedData }).unwrap(),
        {
          loading: t("updating_participant"),
          success: t("itikaf_update_success"),
          error: t("itikaf_update_failed"),
        },
      );
      setOpen(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg shadow-sm transition-all duration-200"
          size="sm"
          title={t("edit")}
        >
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {t("edit_participant_itikaf")}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {t("edit_participant_itikaf_desc")}
          </p>
        </DialogHeader>

        <FormProviderWrapper<ItikafFormData>
          onSubmit={onSubmit}
          defaultValues={{
            ramadanId: item?.ramadanId || "",
            name: item?.name || "",
            fromDate: item?.fromDate
              ? format(new Date(item.fromDate), "yyyy-MM-dd")
              : "",
            toDate: item?.toDate
              ? format(new Date(item.toDate), "yyyy-MM-dd")
              : "",
          }}
        >
          <div className="space-y-4 mt-4">
            <RHFSelect
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
              {isLoading ? t("updating_participant") : t("update_participant")}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditItikafModal;
