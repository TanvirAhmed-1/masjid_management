"use client";
import React from "react";
import FormProviderWrapper from "../../shared/FormProviderWrapper";
import RHFDatePicker from "../../shared/RHFDatePicker";

type FormValue = {
  formDate: string;
  toDate: string;
};
const SearchFridayCollection = () => {
  const onSaveForm = (data: FormValue) => {
    console.log(data);
  };
  return (
    <div>
      <FormProviderWrapper<FormValue> onSubmit={onSaveForm}>
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
      </FormProviderWrapper>
    </div>
  );
};

export default SearchFridayCollection;
