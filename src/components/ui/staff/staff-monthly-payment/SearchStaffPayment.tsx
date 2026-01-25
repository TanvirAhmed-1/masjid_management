"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "../../button";

type FormValue = {
  ramadanYear: string;
  date: string;
  name: string;
};
type Props = {
  onSearch: (data?: FormValue) => void;
};

const SearchStaffPayment = ({ onSearch }: Props) => {
  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid grid-cols-1  gap-4">
            <RHFInput label="name" name="name" placeholder="Enter name" />

            <RHFInput
              label="phone Number"
              name="phone"
              placeholder="Enter phone"
            />

            <div className="flex items-end gap-2">
              <Button
                type="submit"
                className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-800 transition"
              >
                <IoSearch /> Search
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  reset();
                  onSearch();
                }}
                className="flex items-center gap-1 bg-gray-700 text-white hover:bg-gray-800 transition"
              >
                <IoReload /> Reset
              </Button>
            </div>
          </div>
        )}
      </FormProviderWrapper>
    </div>
  );
};

export default SearchStaffPayment;
