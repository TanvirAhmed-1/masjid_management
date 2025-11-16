"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFSelect from "@/src/components/shared/RHFSelect";
import RHFInput from "@/src/components/shared/RHFInput";
import { Button } from "@/src/components/ui/button";
//import { useGetPaymentQuery } from "@/src/redux/features/monthly-salary/monthly-paymentApi";

type FormValue = {
  memberId?: string;
  monthKey?: string;
};

const months = [
  { key: "2025-01", name: "January 2025" },
  { key: "2025-02", name: "February 2025" },
  { key: "2025-03", name: "March 2025" },
  { key: "2025-04", name: "April 2025" },
  { key: "2025-05", name: "May 2025" },
  { key: "2025-06", name: "June 2025" },
  { key: "2025-07", name: "July 2025" },
  { key: "2025-08", name: "August 2025" },
  { key: "2025-09", name: "September 2025" },
  { key: "2025-10", name: "October 2025" },
  { key: "2025-11", name: "November 2025" },
  { key: "2025-12", name: "December 2025" },
];

const SearchMonthlyPayment = () => {
  //const { data: members } = useGetPaymentQuery(undefined);

  const onSearchForm = (data: FormValue) => {
    console.log("Search Payments:", data);
    // এখানে তুমি API call করতে পারো, যেমন monthKey & memberId filter
  };

  const onResetForm = () => {
    console.log("Reset Search");
    // form reset করতে পারো এখানে
  };

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearchForm}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <RHFSelect
            label="Member"
            name="memberId"
            options={
              //members?.result?.map((m: any) => ({
                value: m.id,
                label: m.name,
              })) || []
            }
          /> */}
          <RHFSelect
            label="Month"
            name="monthKey"
            options={months.map((m) => ({ value: m.key, label: m.name }))}
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

export default SearchMonthlyPayment;
