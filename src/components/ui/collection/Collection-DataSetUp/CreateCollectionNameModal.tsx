"use client";

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
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { useState } from "react";
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { useCreateCollectionDataSetUpMutation } from "@/src/redux/features/collection/collectionDataSetUp";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FridayCollectionForm = {
  title: string;
  description: string;
};

function CreateCollectionName() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslationContext();
  const [createCollection, { isLoading }] =
    useCreateCollectionDataSetUpMutation();

  const onSubmit = async (data: FridayCollectionForm) => {
    try {
      const result = await createCollection(data).unwrap();
      toast.success(`${result.message}`);
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || t("collection_name_create_failed"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white flex justify-center items-center">
          <IoMdAdd />
          {t("create_donations")}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3xl">
        <DialogHeader>
          <DialogTitle>{t("create_collection_name")}</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<FridayCollectionForm> onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <RHFInput
              label={t("collection_title")}
              name="title"
              placeholder="Masjid Development Collection 2025"
              rules={{ required: t("collection_title_required") }}
            />
            <RHFTextarea
              label={t("description")}
              name="description"
              placeholder="Masjid Development Collection 2025"
              rows={4}
              rules={{ required: t("description_required") }}
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading}>{t("save")}</LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCollectionName;
