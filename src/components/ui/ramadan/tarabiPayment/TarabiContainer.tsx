"use client";

import { useGetTarabiPaymentQuery } from "@/src/redux/features/ramadan/tarabiPaymentApi";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import PageSizeSelect from "@/src/components/shared/PageSizeSelect";
import Pagination from "@/src/components/shared/Pagination";
import SearchTarabi from "./SearchTarabi";
import TarabiTable from "./TarabiTable";
import CreateTarabiModal from "./CreateTarabiModal";
import { useState } from "react";
import PrintButton from "@/src/components/shared/PrintButton";
import toast from "react-hot-toast";
import TarabiPaymentPDF from "./form/TarabiPaymentPDF";

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
    isFetching,
  } = useGetTarabiPaymentQuery(queryParams);
  const payments = apiResponse?.result?.data || [];
  const meta = apiResponse?.result?.meta;

  const totalPage = meta?.totalPage ?? 1;
  const totalRecords = meta?.total ?? 0;

  const handleBeforePrint = async () => {
    if (payments.length === 0) {
      toast.error("প্রিন্ট করার জন্য কোনো ডাটা নেই!");
      throw new Error("No data available");
    }

    // চেক করছি ডাটাতে একাধিক ভিন্ন ramadanYearId আছে কি না
    const uniqueYears = new Set(
      payments.map((item: any) => item.ramadanYearId),
    );

    if (uniqueYears.size > 1) {
      toast.error(
        "Multiple Ramadan years detected. Please filter by a single year before printing.",
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.dismiss(loadingToast);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-2">
        <h3 className="text-xl md:text-3xl font-bold text-slate-800">
          Tarabi Salary Payments
        </h3>
        <CreateTarabiModal />
      </div>

      <SearchTarabi onSearch={handleSearch} />

      <div className="my-2 flex justify-between items-center">
        <PageSizeSelect
          value={limit}
          onChange={(val) => {
            setLimit(val);
            setPage(1);
          }}
        />

        <PrintButton
          data={payments}
          FormComponent={TarabiPaymentPDF}
          onBeforePrint={handleBeforePrint}
        />
      </div>

      <TarabiTable
        data={payments}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
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
