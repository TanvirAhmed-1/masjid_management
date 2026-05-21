"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import RHFDatePicker from "../../../shared/RHFDatePicker";
import { Button } from "../../button";
import RHFInput from "@/src/components/shared/RHFInput";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormValue = {
  formDate: string;
  toDate: string;
  name: string;
};

type Props = {
  onSearch: (data?: FormValue) => void;
};

const SearchOthersCollection = ({ onSearch }: Props) => {
  const { t } = useTranslationContext();

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
            <RHFInput
              label={t("donor_name")}
              name="name"
              placeholder={t("enter_donor_name")}
            />
            <RHFDatePicker
              label={t("from_date")}
              name="formDate"
              placeholder={t("select_start_date")}
            />
            <RHFDatePicker
              label={t("to_date")}
              name="toDate"
              placeholder={t("select_end_date")}
            />
            <div className="flex items-end gap-2">
              <Button
                type="submit"
                className="bg-green-700 text-white cursor-pointer"
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
                className="bg-gray-700 text-white cursor-pointer"
              >
                <IoReload />
              </Button>
            </div>
          </div>
        )}
      </FormProviderWrapper>
    </div>
  );
};

export default SearchOthersCollection;
