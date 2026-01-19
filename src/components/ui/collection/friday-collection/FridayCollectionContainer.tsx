"use client";

import { useState, useEffect } from "react";
import { useGetFridayCollectionsQuery } from "@/src/redux/features/collection/fridayCollection";
import { AddFridayCollectionModal } from "./AddFridayCollectionModal";
import FridayCollectionRow from "./FridayCollectionRow";
import SearchFridayCollection from "./SearchFridayCollection";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";

type SearchFormValues = {
  fromDate?: string;
  toDate?: string;
};

const FridayCollectionContainer = () => {
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

    const converted = {
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

  const { data, isLoading, isError } =
    useGetFridayCollectionsQuery(queryParams);

  const totalPage = data?.data?.meta?.totalPage ?? 1;

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h3 className="text-lg md:text-3xl text-start text-black">All Friday-Collection</h3>
        <AddFridayCollectionModal />
      </div>
      <SearchFridayCollection onSearch={handleSearch} />
      <div>
        <PageSizeSelect
          value={limit}
          onChange={(val) => {
            setLimit(val);
            setPage(1);
          }}
        />
      </div>
      <FridayCollectionRow
        data={data?.data.data ?? []}
        isLoading={isLoading}
        isError={isError}
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

export default FridayCollectionContainer;
