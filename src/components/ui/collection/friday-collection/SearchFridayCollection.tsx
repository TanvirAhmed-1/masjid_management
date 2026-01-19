"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import RHFDatePicker from "../../../shared/RHFDatePicker";
import { Button } from "../../button";

type FormValue = {
  fromDate?: string;
  toDate?: string;
};
type Props = {
  onSearch: (data?: FormValue) => void;
};
const SearchFridayCollection = ({ onSearch }: Props) => {
  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {" "}
            <RHFDatePicker
              label="From Date"
              name="fromDate"
              placeholder="Enter From Date "
            />
            <RHFDatePicker
              label="To Date"
              name="toDate"
              placeholder="Enter To Date "
            />
            <div className="flex items-end gap-2">
              <Button
                type="submit"
                className="bg-green-700 text-white cursor-pointer"
              >
                <IoSearch />
              </Button>
              <Button
                type="reset"
                className=" bg-gray-700 text-white cursor-pointer"
                onClick={() => {
                  reset();
                  onSearch();
                }}
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

export default SearchFridayCollection;
