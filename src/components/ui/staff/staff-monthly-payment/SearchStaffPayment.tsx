"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "../../../shared/FormProviderWrapper";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "../../button";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";
import { useGetStaffMonthlyPaymentQuery } from "@/src/redux/features/staff/staffMonthlyPayment";

type FormValue = {
  ramadanYear: string;
  date: string;
  name: string;
};
type Props = {
  onSearch: (data?: FormValue) => void;
};

const SearchStaffPayment = ({ onSearch }: Props) => {
  const { data } = useGetStaffMonthlyPaymentQuery(undefined);

  const staffOptions = data?.result?.data?.map((item: any) => ({
    label: item?.staff?.name || "Unknown",
    value: item?.staff?.name || "",
  })) || [{ label: "Unknown", value: "" }];
  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
            <RHFSearchSelect
              label="name"
              name="name"
              placeholder="Enter name"
              options={staffOptions}
            />

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
