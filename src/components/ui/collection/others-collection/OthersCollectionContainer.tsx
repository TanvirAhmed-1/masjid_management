"use client";

import React, { useEffect, useState } from "react";
import AddOthersCollectionModal from "./AddOthersCollectionModal";
import OthersCollectionRow from "./OthersCollectionRow";
import SearchOthersCollection from "./SearchOthersCollection";
import { useGetCollectionQuery } from "@/src/redux/features/collection/collections";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import Pagination from "@/src/components/shared/Pagination";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";

type SearchFormValues = {
  fromDate?: string;
  toDate?: string;
  name?: string;
};
const OthersCollectionContainer = () => {
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
    console.log(data);
    const cleaned = clearqueryObject(data);

    const converted = {
      name: cleaned?.name,
      fromDate: cleaned?.fromDate
        ? new Date(cleaned.fromDate).toISOString()
        : undefined,
      toDate: cleaned?.toDate
        ? new Date(cleaned.toDate).toISOString()
        : undefined,
    };

    setFilters(converted);
    setPage(1);
  };

  const queryParams = {
    page,
    limit,
    ...filters,
  };

  const {
    data: data,
    isLoading,
    isError,
    isFetching,
  } = useGetCollectionQuery(queryParams);
  const totalPage = data?.data?.meta?.totalPage ?? 1;
  const collections = data?.data?.data ?? [];
  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h1 className="text-lg md:text-3xl text-start text-black">
          {" "}
          All Others Collection
        </h1>
        <AddOthersCollectionModal />
      </div>
      <div>
        <SearchOthersCollection onSearch={handleSearch} />
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
        <OthersCollectionRow
          data={collections}
          isLoading={isLoading}
          isError={isError}
          page={page}
          limit={limit}
          isFetching={isFetching}
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
    </div>
  );
};

export default OthersCollectionContainer;
