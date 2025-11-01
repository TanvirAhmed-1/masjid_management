"use client";

import MonthlyPaymentModal from "./MonthlyPaymentModal";
import MonthlyPaymentTable from "./MonthlyPaymentTable";

import SearchMonthlyPayment from "./SearchMonthlyPayment";

const MonthlyPaymentContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Ramadan Year List
        </h3>
        <MonthlyPaymentModal />
      </div>
      <div>
        <SearchMonthlyPayment />

        {/* table section */}
        <MonthlyPaymentTable />
      </div>
    </div>
  );
};

export default MonthlyPaymentContainer;
