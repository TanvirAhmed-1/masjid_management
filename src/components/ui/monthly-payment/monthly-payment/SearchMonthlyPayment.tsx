"use client";

import { IoReload, IoSearch } from "react-icons/io5";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { useMemo } from "react";

type FormValue = {
  year?: string;
  monthKey?: string;
};

type Props = {
  selectedYear: number;
  selectedMonth: string;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: string) => void;
  onSearch: (data: FormValue) => void;
};

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 1;
  const endYear = currentYear + 1;

  return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const y = startYear + i;
    return { value: String(y), label: String(y) };
  });
};

const generateSingleYearMonths = (year: number) => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const value = `${year}-${String(month).padStart(2, "0")}`;
    const label = format(new Date(year, month - 1), "MMMM yyyy");
    return { value, label };
  });
};

export default function SearchMonthlyPayment({
  selectedYear,
  selectedMonth,
  onChangeYear,
  onChangeMonth,
  onSearch,
}: Props) {
  const yearOptions = useMemo(() => generateYearOptions(), []);
  const monthOptions = useMemo(
    () => generateSingleYearMonths(selectedYear),
    [selectedYear]
  );

  return (
    <div className="my-4">
      <FormProviderWrapper<FormValue> onSubmit={onSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RHFSelect
            label="Year"
            name="year"
            options={yearOptions}
            defaultValue={String(selectedYear)}
            onChange={(val) => onChangeYear(Number(val))}
          />
          <RHFSelect
            label="Month"
            name="monthKey"
            options={monthOptions}
            defaultValue={selectedMonth}
            onChange={onChangeMonth}
          />

          <div className="flex items-end gap-2">
            <Button
              type="submit"
              className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-800"
            >
              <IoSearch /> Search
            </Button>
            <Button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center gap-1 bg-gray-700 text-white hover:bg-gray-800"
            >
              <IoReload /> Reset
            </Button>
          </div>
        </div>
      </FormProviderWrapper>
    </div>
  );
}
