"use client";

import { useGetCollectionByIdQuery } from "@/src/redux/features/collection/collections";
import ManageCollectionTable from "./ManageCollectionTable";
import SearchManageCollection from "./SearchManageCollection";
import CreateDonerModal from "./CreateDonerModal";
import { CollectionType } from "@/src/types/collectionType";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import { useEffect, useState } from "react";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import Pagination from "@/src/components/shared/Pagination";
type SearchFormValues = {
  fromDate?: string;
  toDate?: string;
  donorName?: string;
  amount?: number;
};
const ManageCollectionContainer = ({ id }: { id: string }) => {
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
      name: cleaned?.donorName,
      amount: cleaned?.amount,
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
    id,
    page,
    limit,
    ...filters,
  };

  const { data, isLoading, isError, isFetching } =
    useGetCollectionByIdQuery(queryParams);
  console.log(data);
  const totalPage = data?.result?.meta?.totalPage ?? 1;
  const collections: CollectionType[] = data?.result?.data
    ? [data.result.data]
    : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">
          Manage Collection Donor
        </h3>
        <CreateDonerModal id={id} />
      </div>

      <SearchManageCollection onSearch={handleSearch} />

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

      <ManageCollectionTable
        data={collections}
        isLoading={isLoading}
        isError={isError}
        page={page}
        limit={limit}
        isFetching={isFetching}
      />

      <Pagination
        page={page}
        totalPage={totalPage}
        totalRecords={data?.result?.meta?.total ?? 0}
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

export default ManageCollectionContainer;
