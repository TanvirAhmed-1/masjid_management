"use client";

import { useGetMembersQuery } from "@/src/redux/features/monthly-salary/memberApi";
import MemberModal from "./MemberModal";
import MemberTable from "./MemberTable";
import SearchMember from "./SearchMember";
import { useEffect, useState } from "react";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";

export interface MemberType {
  id: string;
  name: string;
  phone: string;
  address: string;
  monthlyAmount: number;
  userId: string;
  mosqueId: string;
  createdAt: string;
  updatedAt: string;
  payments: Payment[];
}
export interface Payment {
  id: string;
  memberId: string;
  monthKey: string;
  amount: number;
  paidDate: string;
  userId: string;
  mosqueId: string | null;
  createdAt: string;
  updatedAt: string;
}

type SearchFormValues = {
  name?: string;
  phone?: string;
  address?: string;
};
const MemberContainer = () => {
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
    console.log("Cleaned search data:", cleaned);
    setFilters(cleaned);
    setPage(1);
  };

  const queryParams = {
    page,
    limit,
    ...filters,
  };

  const { data, isLoading, isFetching } = useGetMembersQuery(queryParams);

  const totalPage = data?.data?.meta?.totalPage ?? 1;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Members List
        </h3>
        <MemberModal />
      </div>

      <div>
        <SearchMember onSearch={handleSearch} />
        {/* Pagination */}
        <div>
          <PageSizeSelect
            value={limit}
            onChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />
        </div>
        {/* table section */}
        <MemberTable
          members={data?.result?.data ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          page={page}
          limit={limit}
        />
      </div>
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

export default MemberContainer;
