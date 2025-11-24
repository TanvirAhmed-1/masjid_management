"use client";

import { useState } from "react";
import { useGetMonthlyPaymentsQuery } from "@/src/redux/features/monthly-salary/paymentApi";
import SearchMonthlyPayment from "./SearchMonthlyPayment";
import MonthlyPaymentModal from "./MonthlyPaymentModal";
import MonthlyPaymentTable from "./MonthlyPaymentTable";

const MonthlyPaymentContainer = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = `${currentYear}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}`;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { data, isLoading, isError } =
    useGetMonthlyPaymentsQuery(selectedMonth);

  const handleSearch = (form: any) => {
    if (form.monthKey) setSelectedMonth(form.monthKey);
    if (form.year) setSelectedYear(Number(form.year));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-3xl text-black">
          Monthly Ramadan Collection
        </h3>
        <MonthlyPaymentModal />
      </div>

      <SearchMonthlyPayment
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onChangeYear={setSelectedYear}
        onChangeMonth={setSelectedMonth}
        onSearch={handleSearch}
      />

      <MonthlyPaymentTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default MonthlyPaymentContainer;
