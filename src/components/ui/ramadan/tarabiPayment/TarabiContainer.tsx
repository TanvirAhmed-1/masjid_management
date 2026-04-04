"use client";

import { useGetTarabiPaymentQuery } from "@/src/redux/features/ramadan/tarabiPaymentApi";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
import SearchTarabi from "./SearchTarabi";
import TarabiTable from "./TarabiTable";
import CreateTarabiModal from "./CreateTarabiModal";
import { useState } from "react";

const TarabiContainer = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filters, setFilters] = useState<any>(undefined);

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

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetTarabiPaymentQuery(queryParams);
  const payments = apiResponse?.result?.data || [];
  const meta = apiResponse?.result?.meta;

  const totalPage = meta?.totalPage ?? 1;
  const totalRecords = meta?.total ?? 0;

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-2">
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
        data={payments}
        isLoading={isLoading}
        isError={isError}
        page={page}
        limit={limit}
      />

      {payments.length > 0 && (
        <Pagination
          page={page}
          totalPage={totalPage}
          totalRecords={totalRecords}
          limit={limit}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      )}
    </div>
  );
};

export default TarabiContainer;
