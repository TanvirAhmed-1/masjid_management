"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "@/src/components/ui/button";

type FormValue = {
  name: string;
  phone?: string;
  address?: string;
};

const SearchMember = () => {
  const onSearchForm = (data: FormValue) => {
    console.log("Search Submitted:", data);
    // এখানে তুমি API call করতে পারো
    // e.g., fetch members with filter by name/phone/address
  };

  const onResetForm = () => {
    console.log("Reset Search");
    // এখানে form reset করতে পারো
  };

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearchForm}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RHFInput label="Name" name="name" placeholder="Enter member name" />
          <RHFInput
            label="Phone"
            name="phone"
            placeholder="Enter phone number"
          />
          <RHFInput
            label="Address"
            name="address"
            placeholder="Enter address"
          />
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

export default SearchMember;
