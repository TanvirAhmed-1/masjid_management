"use client";

import { useEffect, useState } from "react";
import { useGetTarabiPaymentQuery } from "@/src/redux/features/ramadan/tarabiPaymentApi";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
import SearchTarabi from "./SearchTarabi";
import TarabiTable from "./TarabiTable";
import CreateTarabiModal from "./CreateTarabiModal";

const TarabiContainer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<any>(undefined);
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    if (!initialLoaded) {
      setInitialLoaded(true);
      setFilters(undefined);
    }
  }, [initialLoaded]);

  const handleSearch = (data?: any) => {
    const cleaned = clearqueryObject(data);
    setFilters(cleaned);
    setPage(1);
  };

  const queryParams = {
    page,
    limit,
    ...filters,
  };

  const { data, isLoading, isError } = useGetTarabiPaymentQuery(queryParams);
  const totalPage = data?.result?.meta?.totalPage ?? 1;

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <h3 className="text-xl md:text-3xl font-bold text-slate-800">
          Tarabi Salary Payments
        </h3>
        <CreateTarabiModal />
      </div>

      <SearchTarabi onSearch={handleSearch} />

      <div className="my-4">
        <PageSizeSelect
          value={limit}
          onChange={(val) => {
            setLimit(val);
            setPage(1);
          }}
        />
      </div>

      <TarabiTable
        data={data?.result ?? []}
        isLoading={isLoading}
        isError={isError}
        page={page}
        limit={limit}
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

export default TarabiContainer;
