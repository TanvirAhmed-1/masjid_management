"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "../../button";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type FormValue = {
  year: string;
};
type Props = {
  onSearch: (data?: any) => void;
};

const SearchRamadan = ({ onSearch }: Props) => {
  const { t } = useTranslationContext();

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <RHFInput
              label={t("ramadan_year")}
              name="year"
              placeholder={t("enter_ramadan_year")}
            />
            <div className="flex items-end gap-2">
              <Button
                type="submit"
                className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-800 transition"
              >
                <IoSearch /> {t("search")}
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  reset();
                  onSearch();
                }}
                className="flex items-center gap-1 bg-gray-700 text-white hover:bg-gray-800 transition"
              >
                <IoReload /> {t("reset_button")}
              </Button>
            </div>
          </div>
        )}
      </FormProviderWrapper>
    </div>
  );
};

export default SearchRamadan;
