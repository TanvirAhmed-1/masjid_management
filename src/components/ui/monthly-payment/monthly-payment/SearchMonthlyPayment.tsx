"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { Button } from "@/src/components/ui/button";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormValue = {
  name?: string;
  monthKey?: string;
  phone?: string;
  form?: string;
  to?: string;
};

type Props = {
  onSearch: (data?: FormValue) => void;
};

export default function SearchMonthlyPayment({ onSearch }: Props) {
  const { t } = useTranslationContext();

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
            <RHFInput
              label={t("name")}
              name="name"
              placeholder={t("enter_name")}
            />
            <RHFInput
              label={t("phone")}
              name="phone"
              placeholder={t("enter_phone")}
            />
            <RHFInput
              label={t("month")}
              name="monthKey"
              placeholder={t("enter_month")}
            />
            <RHFDatePicker
              label={t("from_date")}
              name="form"
              placeholder={t("select_start_date")}
            />
            <RHFDatePicker
              label={t("to_date")}
              name="to"
              placeholder={t("select_end_date")}
            />
            <div className="flex-1 flex items-end justify-end gap-2">
              <Button
                type="submit"
                className="flex cursor-pointer items-center gap-1 bg-green-700 text-white hover:bg-green-800"
                title={t("search")}
              >
                <IoSearch />
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  reset();
                  onSearch();
                }}
                className="flex cursor-pointer items-center gap-1 bg-gray-700 text-white hover:bg-gray-800"
              >
                <IoReload />
              </Button>
            </div>
          </div>
        )}
      </FormProviderWrapper>
    </div>
  );
}
