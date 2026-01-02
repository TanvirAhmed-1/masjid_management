"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "@/src/components/ui/button";

type FormValue = {
  name: string;
  phone: string;
  email: string;
};

const SearchMosque = () => {
  const onSearchForm = (data: FormValue) => {
    console.log("Search Submitted:", data);
  };

  const onResetForm = () => {
    console.log("Reset Search");
  };

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearchForm}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RHFInput
            label="Mosque Name"
            name="name"
            placeholder="Enter mosque name"
          />
          <RHFInput
            label="Phone"
            name="phone"
            placeholder="Enter phone number"
          />
          <RHFInput label="Email" name="email" placeholder="Enter email" />
          <div className="flex items-end gap-2">
            <Button
              type="submit"
              className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-800 transition"
            >
              <IoSearch /> Search
            </Button>
            <Button
              type="button"
              onClick={onResetForm}
              className="flex items-center gap-1 bg-gray-700 text-white hover:bg-gray-800 transition"
            >
              <IoReload /> Reset
            </Button>
          </div>
        </div>
      </FormProviderWrapper>
    </div>
  );
};




export default SearchMosque;