"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { Button } from "@/src/components/ui/button";
import RHFInput from "@/src/components/shared/RHFInput";

type FormValue = {
  year?: string;
  monthKey?: string;
  monthName?: string;
};

type Props = {
  onSearch: (data: FormValue) => void;
};


export default function SearchMonthlyPayment({ onSearch }: Props) {
  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {(reset) => (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <RHFInput label="Year" name="year" placeholder="Enter year" />
            <RHFInput
              label="Month"
              name="monthKey"
              placeholder="Enter month key"
            />
            <RHFInput
              label="Month Name"
              name="monthName"
              placeholder="Enter month name"
            />

            <div className="flex items-end gap-2">
              <Button
                type="submit"
                className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-800"
              >
                <IoSearch /> Search
              </Button>
              <Button
                type="reset"
                onClick={() => reset()}
                className="flex items-center gap-1 bg-gray-700 text-white hover:bg-gray-800"
              >
                <IoReload /> Reset
              </Button>
            </div>
          </div>
        )}
      </FormProviderWrapper>
    </div>
  );
}
