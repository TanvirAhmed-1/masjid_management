"use client";

import { useEffect, useState } from "react";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
import AccessoryTable from "./AccessoryTable";
import CreateAccessoryModal from "./CreateAccessoryModal";
import { useGetAccessoryPurchasesQuery } from "@/src/redux/features/monthly-salary/accessoryPurchase/accessoryPurchaseApi";
import SearchAccessory from "./SharchAccessory";

type SearchFormValues = {
  from?: string;
  to?: string;
  itemName?: string;
};

const AccessoryPurchasesContainer = () => {
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
    useGetAccessoryPurchasesQuery(queryParams);
  const totalPage = data?.result?.meta?.totalPage ?? 1;

  return (
    <div className=" bg-white rounded-lg ">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <h3 className="text-xl md:text-3xl font-bold text-slate-800">
          Accessory Purchase Records
        </h3>
        <CreateAccessoryModal />
      </div>

      <SearchAccessory onSearch={handleSearch} />

      <div className="my-4">
        <PageSizeSelect
          value={limit}
          onChange={(val) => {
            setLimit(val);
            setPage(1);
          }}
        />
      </div>

      <AccessoryTable
        data={data?.result?.data ?? []}
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

export default AccessoryPurchasesContainer;
