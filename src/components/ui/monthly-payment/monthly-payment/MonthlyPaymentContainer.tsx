"use client";

import { useEffect, useState } from "react";
import { useGetpaymentQuery } from "@/src/redux/features/monthly-salary/paymentApi";
import SearchMonthlyPayment from "./SearchMonthlyPayment";
import MonthlyPaymentModal from "./MonthlyPaymentModal";
import MonthlyPaymentTable from "./MonthlyPaymentTable";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import Pagination from "@/src/components/shared/Pagination";

export interface PaymentType {
  id: string;
  memberId: string;
  monthKey: string;
  amount: number;
  paidDate: string;
  userId: string;
  mosqueId: string;
  createdAt: string;
  updatedAt: string;
  member: Member;
  user: User;
}

export interface Member {
  name: string;
  phone: string;
}

export interface User {
  name: string;
}

type SearchFormValues = {
  year?: string;
  monthKey?: string;
  monthName?: string;
};

const MonthlyPaymentContainer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<SearchFormValues | undefined>();
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    if (!initialLoaded) {
      setInitialLoaded(true);
      setFilters(undefined);
    }
  }, [initialLoaded]);

  const handleSearch = (data?: SearchFormValues) => {
    const cleaned = clearqueryObject(data);
    setFilters(cleaned);
    setPage(1);
  };
  const queryParams = {
    page,
    limit,
    ...filters,
  };

  const { data, isLoading, isFetching } = useGetpaymentQuery(queryParams);
  const totalPage = data?.data?.meta?.totalPage ?? 1;
  
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-3xl text-black">
          Monthly Ramadan Collection
        </h3>
        <MonthlyPaymentModal />
      </div>

      <SearchMonthlyPayment onSearch={handleSearch} />

      <MonthlyPaymentTable
        data={data?.data?.data || []}
        isLoading={isLoading}
        isFetching={isFetching}
        page={page}
        limit={limit}
      />

      {/* Pagination buttons */}
      <Pagination
        page={page}
        totalPage={totalPage}
        totalRecords={data?.data?.meta?.total ?? 0}
        limit={limit}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default MonthlyPaymentContainer;
