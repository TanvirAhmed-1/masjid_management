"use client";

import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "@/src/components/ui/button";
import { IoReload, IoSearch } from "react-icons/io5";

type FormValue = {
  from?: string;
  to?: string;
  itemName?: string;
};

type Props = {
  onSearch: (data?: FormValue) => void;
};

const SearchAccessory = ({ onSearch }: Props) => {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 my-6">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 items-end">
            <RHFInput 
              label="Search Item" 
              name="itemName" 
              placeholder="Enter item name..." 
            />
            <RHFDatePicker
              label="From Date"
              name="from"
              placeholder="Start Date"
            />
            <RHFDatePicker
              label="To Date"
              name="to"
              placeholder="End Date"
            />
            <div className="flex gap-2">
              <Button type="submit" className="bg-teal-600 text-white flex-1">
                <IoSearch className="mr-2" /> Search
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  reset();
                  onSearch();
                }}
                className="bg-slate-200 text-slate-700 hover:bg-slate-300"
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

export default SearchAccessory;