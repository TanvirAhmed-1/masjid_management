"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import RHFDatePicker from "../../../shared/RHFDatePicker";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "../../button";
import { useFormContext } from "react-hook-form";

type FormValue = {
  ramadanYear: string;
  date: string;
  name: string;
};

const SearchOthersCollection = () => {
  const onSaveForm = (data: FormValue) => {
    console.log("Form Submitted:", data);
  };

  const { reset } = useFormContext<FormValue>();

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSaveForm}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RHFInput
            label="Ramadan Year"
            name="ramadanYear"
            placeholder="Enter Ramadan year"
          />

          <RHFInput
            label="Name"
            name="name"
            placeholder="Enter name"
          />

          <RHFDatePicker
            label="Date"
            name="date"
            placeholder="Enter Date"
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
              className="flex items-center gap-1 bg-gray-700 text-white hover:bg-gray-800 transition"
              onClick={() => reset()}
            >
              <IoReload /> Reset
            </Button>
          </div>
        </div>
      </FormProviderWrapper>
    </div>
  );
};

export default SearchOthersCollection;
