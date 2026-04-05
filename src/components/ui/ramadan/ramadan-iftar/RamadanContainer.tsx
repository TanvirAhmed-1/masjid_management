"use client";

import { useEffect, useState } from "react";
import AddRamadanModal from "./AddRamadanModal";
import IftarListRow from "./IftarListRow";
import SearchiftarList from "./SearchiftarList";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { useItferlistQuery } from "@/src/redux/features/ramadan/iftarlist";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
import PrintButton from "@/src/components/shared/PrintButton";
import RamadanIftarPDF from "./form/RmadanIfterList";
import toast from "react-hot-toast";

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

  const handleBeforePrint = async () => {
    const list = ifterListData?.result?.data || [];

    if (list.length === 0) {
      toast.error("No data to print");
      throw new Error("No data");
    }
    const uniqueYears = new Set(list.map((item: any) => item.ramadanyearId));

    if (uniqueYears.size > 1) {
      toast.error(
        "one year data print only possible! Search and get only one year data to print.",
        {
          duration: 4000,
          style: {
            border: "1px solid #ff4b4b",
            padding: "16px",
            color: "#ff4b4b",
          },
        },
      );

      throw new Error("Multiple years detected");
    }

    const loadingToast = toast.loading("Preparing document for printing...");
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.dismiss(loadingToast);
  };

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
        <div className="my-1 pr-1 flex items-center justify-between gap-4">
          <PageSizeSelect
            value={limit}
            onChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />

          <PrintButton
            data={ifterListData?.result?.data}
            FormComponent={RamadanIftarPDF}
            onBeforePrint={handleBeforePrint}
            documentTitle="Ramadan_Iftar_List"
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
