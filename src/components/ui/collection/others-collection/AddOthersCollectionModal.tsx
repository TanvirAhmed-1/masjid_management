"use client";

import { useState, useEffect } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
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
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useCreateCollectionMutation } from "@/src/redux/features/collection/collections";
import { useGetCollectionDataSetUpQuery } from "@/src/redux/features/collection/collectionDataSetUp";
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type Doner = {
  name: string;
  amount: number;
};

type OthersCollectionForm = {
  date: string;
  otherCollectionNameId: string;
  doners: Doner[];
  totalAmount: number;
};

function AddOthersCollectionModal() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslationContext();
  const { data, isLoading } = useGetCollectionDataSetUpQuery(undefined);
  const [createCollection, { isLoading: isCreating }] =
    useCreateCollectionMutation();

  const onSubmit = async (data: OthersCollectionForm) => {
    const payload = {
      otherCollectionNameId: data.otherCollectionNameId,
      date: new Date(data.date).toISOString(),
      donors: data?.doners?.map((d) => ({
        name: d.name,
        amount: Number(d.amount),
      })),
    };
    try {
      await createCollection(payload).unwrap();
      toast.success("Others Collection created successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create Others Collection");
    }
  };

  const options = data?.data?.data?.map((item: any) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex items-center">
          <IoMdAdd className="mr-1" />
          {t("add_donation")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("add_donor_by_donation_type")}</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<OthersCollectionForm>
          onSubmit={onSubmit}
          defaultValues={{ doners: [{ name: "", amount: 0 }] }}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-4">
              <RHFSelect
                label={t("collection_type")}
                name="otherCollectionNameId"
                placeholder={t("select_collection_type")}
                rules={{ required: t("collection_type_required") }}
                options={options || []}
              />
              <RHFDatePicker
                label={t("date")}
                name="date"
                placeholder={t("select_start_date")}
                rules={{ required: t("date_required") }}
              />

              {/* Doner Fields */}
              <DonerFields />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <LoadingButton isLoading={isCreating}>{t("save")}</LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

function DonerFields() {
  const { control, setValue } = useFormContext<OthersCollectionForm>();
  const { t } = useTranslationContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "doners",
  });

  const doners = useWatch({ control, name: "doners" });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalSum =
      doners?.reduce((acc, curr) => acc + Number(curr.amount || 0), 0) || 0;
    setTotal(totalSum);
    setValue("totalAmount", totalSum);
  }, [doners, setValue]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-2 gap-3 items-end border p-3 rounded-md bg-gray-50 relative"
        >
          <RHFInput
            label={t("donor_name")}
            name={`doners.${index}.name`}
            placeholder={t("enter_donor_name")}
          />
          <RHFInput
            label={t("amount")}
            name={`doners.${index}.amount`}
            placeholder={t("enter_amount")}
          />

          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              title={t("delete")}
            >
              <IoMdClose size={18} />
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <div className="mt-4 text-left font-semibold text-lg">
          {t("total_amount_label")}: <span className="text-teal-600">৳ {total}</span>
        </div>
        <button
          type="button"
          onClick={() => append({ name: "", amount: 0 })}
          className="text-teal-600 bg-teal-100 p-1 rounded-full hover:bg-teal-200 hover:text-teal-700 transition"
          title={t("add_donation")}
        >
          <IoMdAdd size={20} />
        </button>
      </div>
    </div>
  );
}

export default AddOthersCollectionModal;
