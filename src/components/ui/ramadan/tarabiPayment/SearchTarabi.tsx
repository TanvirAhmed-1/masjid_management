"use client";

import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "@/src/components/ui/button";
import { IoReload, IoSearch } from "react-icons/io5";

type Props = {
  onSearch: (data?: any) => void;
};

const SearchTarabi = ({ onSearch }: Props) => {
  return (
    <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <FormProviderWrapper onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-end">
            <RHFInput
              label="Search by Description"
              name="description"
              placeholder="Enter search term..."
            />
            {/* আপনি চাইলে এখানে মেম্বার বা ইয়ার ফিল্টারও যোগ করতে পারেন */}
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-700 text-white flex-1">
                <IoSearch className="mr-2" /> Search
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  reset();
                  onSearch();
                }}
                className="bg-slate-700 text-white"
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

export default SearchTarabi;