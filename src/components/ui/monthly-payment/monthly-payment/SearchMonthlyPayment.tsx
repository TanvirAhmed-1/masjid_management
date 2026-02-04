"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { Button } from "@/src/components/ui/button";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";

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
  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
            <RHFInput label="Name" name="name" placeholder="Enter your name" />
            <RHFInput
              label="Phone"
              name="phone"
              placeholder="Enter phone number"
            />
            <RHFInput
              label="Month"
              name="monthKey"
              placeholder="Enter month key"
            />
            <RHFDatePicker
              label="Form Date"
              name="form"
              placeholder="Select form date"
            />
            <RHFDatePicker
              label="To Date"
              name="to"
              placeholder="Select to date"
            />
            <div className="flex-1 flex items-end justify-end gap-2">
              <Button
                type="submit"
                className="flex cursor-pointer items-center gap-1 bg-green-700 text-white hover:bg-green-800"
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
