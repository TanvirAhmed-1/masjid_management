"use client";

import { useEffect, useState } from "react";
import AddRamadanModal from "./AddRamadanModal";
import IftarListRow from "./IftarListRow";
import SearchiftarList from "./SearchiftarList";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { useItferlistQuery } from "@/src/redux/features/ramadan/iftarlist";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";

type SearchFormValues = {
  ramadanYear?: string;
  date?: string;
  name?: string;
};
const RamadanContainer = () => {
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
    setFilters(cleaned);
    setPage(1);
  };

  const queryParams = {
    page,
    limit,
    ...filters,
  };

  const {
    data: ifterListData,
    isLoading,
    isFetching,
  } = useItferlistQuery(queryParams);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Ramadan Iftar List
        </h3>
        <AddRamadanModal />
      </div>
      <div>
        <SearchiftarList onSearch={handleSearch} />
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
        <IftarListRow
          data={ifterListData?.result?.data ?? []}
          page={page}
          limit={limit}
          isLoading={isLoading}
          isFetching={isFetching}
        />

        <Pagination
          page={page}
          totalPage={ifterListData?.result?.meta?.totalPages ?? 0}
          totalRecords={ifterListData?.result?.meta?.total ?? 0}
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

export default RamadanContainer;
