"use client";

import { useState, useEffect } from "react";
import { useGetFridayCollectionsQuery } from "@/src/redux/features/collection/fridayCollection";
import { AddFridayCollectionModal } from "./AddFridayCollectionModal";
import FridayCollectionRow from "./FridayCollectionRow";
import SearchFridayCollection from "./SearchFridayCollection";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { Button } from "../../button";

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
    setFilters(cleaned);
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
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black">All Friday-Collection</h3>
        <AddFridayCollectionModal />
      </div>
      <SearchFridayCollection onSearch={handleSearch} />
      <div className="flex flex-row-reverse justify-end items-center ml-1 gap-2 mb-2">
        <label className="text-sm font-medium text-gray-600">Items per page</label>
        <select
          className="border rounded p-1 text-sm shadow-sm"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          {[2, 1, 4, 5, 10, 20, 15, 30, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <FridayCollectionRow
        data={data?.data.data ?? []}
        isLoading={isLoading}
        isError={isError}
        page={page}
        limit={limit}
      />
      {/* Pagination buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {data?.data?.data?.length ?? 0} of{" "}
          {data?.data?.meta?.total ?? 0} total records | Page {page} of{" "}
          {totalPage}
        </div>

        <div className="flex gap-2 items-center justify-center text-xs">
          <Button
            className="py-0 px-2 text-xs cursor-pointer "
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </Button>
          <span>
            Page {page} of {totalPage}
          </span>
          <Button
            className="py-0 px-2 text-xs cursor-pointer "
            disabled={page === totalPage}
            onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FridayCollectionContainer;
