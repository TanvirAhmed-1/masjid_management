"use client";

import AddItikafModal from "./AddItikafModal";
import ItikafRow from "./ItikafRow";
import SearchItikaf from "./SearchItikaf";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { useEffect, useState } from "react";
import Pagination from "@/src/components/shared/Pagination";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import { useGetStaffListQuery } from "@/src/redux/features/staff/staffApi";

interface RamadanData {
  ramadanYear: string;
  titleName: string;
}

export interface ItikafData {
  id: string;
  name: string;
  fromDate: Date;
  toDate: Date;
  ramadanId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  ramadanYear: RamadanData;
}

type SearchFormValues = {
  name?: string;
  year?: string;
};

const ItikafContainer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
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
    console.log("Cleaned Filters:", cleaned);
    setFilters(cleaned);
    setPage(1);
  };

  const queryParams = {
    page,
    limit,
    ...filters,
  };

  const {
    data: itikafs,
    isLoading,
    isFetching,
  } = useGetStaffListQuery(queryParams);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Itikaf Participant List
        </h3>
        <AddItikafModal />
      </div>
      <div>
        <SearchItikaf onSearch={handleSearch} />

        {/* // Page size selector */}
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
        <ItikafRow
          data={itikafs?.result?.data}
          isLoading={isLoading}
          isFetching={isFetching}
          page={page}
          limit={limit}
        />

        <Pagination
          page={page}
          totalPage={itikafs?.result?.meta?.totalPages ?? 0}
          totalRecords={itikafs?.result?.meta?.total ?? 0}
          limit={limit}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default ItikafContainer;
