"use client";

import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import RamadanModal from "./RamadanModal";
import RamadanRow from "./RamadanRow";
import SearchRamadan from "./SearchRamadan";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { useEffect, useState } from "react";
import Pagination from "@/src/components/shared/Pagination";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type SearchFormValues = {
  year?: string;
};

const RamadanDataSetUpContainer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<SearchFormValues | undefined>();
  const [initialLoaded, setInitialLoaded] = useState(false);
  const { t } = useTranslationContext();

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
    data: ramadanYear,
    isLoading,
    isFetching,
  } = useGetRamadanYearQuery(queryParams);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl font-semibold">
          {t("all_ramadan_year_list")}
        </h3>
        <RamadanModal />
      </div>
      <div>
        <SearchRamadan onSearch={handleSearch} />
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
        
        {/* table section with premium loading wrapper */}
        {isLoading ? (
          <div className="py-20 flex justify-center items-center">
            <LoaderScreen className="h-auto" />
          </div>
        ) : (
          <>
            <RamadanRow
              data={ramadanYear?.result?.data}
              isLoading={isLoading}
              isFetching={isFetching}
              page={page}
              limit={limit}
            />

            <Pagination
              page={page}
              totalPage={ramadanYear?.result?.meta?.totalPages ?? 0}
              totalRecords={ramadanYear?.result?.meta?.total ?? 0}
              limit={limit}
              onPageChange={(newPage) => setPage(newPage)}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RamadanDataSetUpContainer;
