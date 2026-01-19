"use client";

import SearchCollectionName from "./SearchCollectionName";
import CollectionTable from "./CollectionTable";
import { useGetCollectionDataSetUpQuery } from "@/src/redux/features/collection/collectionDataSetUp";
import CreateCollectionName from "./CreateCollectionNameModal";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { useEffect, useState } from "react";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
type SearchFormValues = {
  fromDate?: string;
  toDate?: string;
};
const CollectionNameContainer = () => {
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
    useGetCollectionDataSetUpQuery(queryParams);
  const totalPage = data?.data?.meta?.totalPage ?? 1;

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <h3 className="text-lg md:text-3xl text-start text-black"> All Collection Names</h3>
        <CreateCollectionName />
      </div>
      <div>
        <SearchCollectionName onSearch={handleSearch} />
        {/* //page par item select */}
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
        <CollectionTable
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
    </div>
  );
};

export default CollectionNameContainer;
