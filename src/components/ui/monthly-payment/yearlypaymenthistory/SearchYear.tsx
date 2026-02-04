"use client";

import React, { useState, useMemo } from "react";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { Button } from "../../button";
import { IoReload, IoSearch } from "react-icons/io5";
import YearlyPaymentHistory from "./YearlypaymentHistory";

type FormValue = { year: string };

const useYearOptions = () =>
  useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 9 }, (_, i) => ({
      value: String(current - 5 + i),
      label: String(current - 5 + i),
    }));
  }, []);

export default function SearchYear() {
  const currentYear = String(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearOptions = useYearOptions();

  const onSearch = (data: FormValue) => {
    setSelectedYear(data.year);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center justify-between w-full ">
        <div>
          <h1 className="md:text-2xl  font-bold text-gray-800">
            Yearly Payment History — {selectedYear}
          </h1>
        </div>
        {/* FORM */}
        <div>
          <FormProviderWrapper<FormValue>
            onSubmit={onSearch}
            defaultValues={{ year: currentYear }}
          >
            {({ reset }) => (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <RHFSelect label="Year" name="year" options={yearOptions} />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-800"
                  >
                    <IoSearch /> Search
                  </Button>

                  <Button
                    type="reset"
                    onClick={() => {
                      reset();
                      setSelectedYear(currentYear);
                    }}
                    className="flex items-center gap-1 bg-gray-700 text-white hover:bg-gray-800"
                  >
                    <IoReload /> Reset
                  </Button>
                </div>
              </div>
            )}
          </FormProviderWrapper>
        </div>
      </div>

      {/* RESULTS */}
      <div className="mt-3">
        <YearlyPaymentHistory year={selectedYear} />
      </div>
    </div>
  );
}
