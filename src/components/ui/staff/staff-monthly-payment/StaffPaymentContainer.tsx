"use client";

import { useState } from "react";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
import AddStaffPaymentModal from "./AddStaffPaymentModal";
import StaffPaymentRow from "./StaffPaymentRow";
import SearchStaffPayment from "./SearchStaffPayment";
import { useGetStaffPaymentsQuery } from "@/src/redux/features/staff/StaffPayments";
import { useGetStaffMonthlyPaymentQuery } from "@/src/redux/features/staff/staffMonthlyPayment";
import PrintButton from "@/src/components/shared/PrintButton";
import toast from "react-hot-toast";
import StaffSalaryPDF from "./form/StaffSalaryPDF";

type SearchFormValues = {
  name?: string;
  phone?: string;
};

const StaffPaymentContainer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<SearchFormValues>();

  const handleSearch = (data?: SearchFormValues) => {
    setFilters(clearqueryObject(data));
    setPage(1);
  };

  const { data, isLoading, isFetching } = useGetStaffMonthlyPaymentQuery({
    page,
    limit,
    ...filters,
  });

  const paymentsList = data?.result?.data ?? [];

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <h3 className="text-lg md:text-3xl">All Staff Salary Payment List</h3>
        <AddStaffPaymentModal />
      </div>

      <SearchStaffPayment onSearch={handleSearch} />

      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <PageSizeSelect
          value={limit}
          onChange={(val) => {
            setLimit(val);
            setPage(1);
          }}
        />

        <PrintButton
          data={paymentsList} 
          FormComponent={StaffSalaryPDF}
          onBeforePrint={async () => {
            const toastId = toast.loading("Preparing document for printing...");
            await new Promise((resolve) => setTimeout(resolve, 800));
            toast.dismiss(toastId);
          }}
          documentTitle={`Staff_Salary_Report_${new Date().getTime()}`}
        />
      </div>

      <StaffPaymentRow
        data={data?.result?.data ?? []}
        page={page}
        limit={limit}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <Pagination
        page={page}
        totalPage={data?.result?.meta?.totalPage ?? 0}
        totalRecords={data?.result?.meta?.total ?? 0}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default StaffPaymentContainer;
