"use client";

import { useState } from "react";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { useGetStaffListQuery } from "@/src/redux/features/staff/staffApi";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
import StaffSearch from "./StaffSearch";
import StaffRow from "./StaffRow";
import CreateStaffModal from "./CreateStaffModal";

type SearchFormValues = {
  name?: string;
  phone?: string;
};

const StaffContainer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<SearchFormValues>();

  const handleSearch = (data?: SearchFormValues) => {
    setFilters(clearqueryObject(data));
    setPage(1);
  };

  const { data, isLoading, isFetching } = useGetStaffListQuery({
    page,
    limit,
    ...filters,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-3xl">All Staff List</h3>
        <CreateStaffModal />
      </div>

      <StaffSearch onSearch={handleSearch} />

      <PageSizeSelect
        value={limit}
        onChange={(val) => {
          setLimit(val);
          setPage(1);
        }}
      />

      <StaffRow
        data={data?.result?.data ?? []}
        page={page}
        limit={limit}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <Pagination
        page={page}
        totalPage={data?.result?.meta?.totalPage ?? 0} // ✅ FIXED
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

export default StaffContainer;
