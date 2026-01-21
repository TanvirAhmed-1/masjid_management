"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import RHFDatePicker from "../../../shared/RHFDatePicker";
import { Button } from "../../button";
import RHFInput from "@/src/components/shared/RHFInput";

type FormValue = {
  formDate: string;
  toDate: string;
  donorName: string;
  amount: number;
};
type Props = {
  onSearch: (data?: FormValue) => void;
};
const SearchManageCollection = ({ onSearch }: Props) => {
  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid md:grid-cols-7  justify-between gap-4">
            <div className="col-span-6 grid md:grid-cols-4 grid-cols-1 gap-4">
              <RHFInput
                label="Doner Name"
                name="donorName"
                placeholder="Enter Doner Name"
              />
              <RHFInput
                label="Amount"
                name="amount"
                placeholder="Enter Amount"
              />
              <RHFDatePicker
                label="Form Date"
                name="formDate"
                placeholder="Enter Form Date "
              />
              <RHFDatePicker
                label="To Date"
                name="toDate"
                placeholder="Enter To Date "
              />
            </div>
            <div className="flex items-end md:gap-2 gap-4">
              <Button
                type="submit"
                className="bg-green-700 text-white cursor-pointer"
              >
                <IoSearch />
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  reset();
                  onSearch();
                }}
                className=" bg-gray-700 text-white cursor-pointer"
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

export default SearchManageCollection;
