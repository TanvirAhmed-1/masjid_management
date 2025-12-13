import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import React from "react";
import { Button } from "../../button";
import { IoReload, IoSearch } from "react-icons/io5";
type FormValue = {
  formDate: string;
  toDate: string;
};
const SearchCollectionName = () => {
  const onSaveForm = (data: FormValue) => {
    console.log(data);
  };
  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSaveForm}>
        <div className="grid grid-cols-3 gap-4">
          {" "}
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
            >
              <IoReload />
            </Button>
          </div>
        </div>
      </FormProviderWrapper>
    </div>
  );
};

export default SearchCollectionName;
