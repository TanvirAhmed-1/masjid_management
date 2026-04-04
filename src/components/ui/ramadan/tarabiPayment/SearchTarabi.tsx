"use client";

import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";
import { Button } from "@/src/components/ui/button";
import { useGetMembersQuery } from "@/src/redux/features/monthly-salary/memberApi";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import { IoReload, IoSearch } from "react-icons/io5";

type Props = {
  onSearch: (data?: any) => void;
};

const SearchTarabi = ({ onSearch }: Props) => {
  // Fetching data
  const { data: membersData } = useGetMembersQuery(undefined);
  const { data: yearsData } = useGetRamadanYearQuery(undefined);

  return (
    <div className=" p-4  ">
      <FormProviderWrapper onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid md:grid-cols-5 grid-cols-1 gap-4 items-end">
            {/* Member Search Select */}
            <RHFSearchSelect
              label="Member Name"
              name="memberId"
              options={
                membersData?.result?.data?.map((m: any) => ({
                  label: m.name,
                  value: m.id,
                })) || []
              }
              placeholder="Search member..."
            />

            {/* Ramadan Year Search Select */}
            <RHFSearchSelect
              label="Ramadan Year"
              name="ramadanYearId"
              options={
                yearsData?.result?.data?.map((y: any) => ({
                  label: `${y.titleName} (${y.ramadanYear})`,
                  value: y.id,
                })) || []
              }
              placeholder="Search year..."
            />

            <RHFDatePicker
              label="From Date"
              name="from"
              placeholder="Start Date"
            />

            <RHFDatePicker label="To Date" name="to" placeholder="End Date" />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                <IoSearch className="mr-2" /> Search
              </Button>
              <Button
                type="button" // Changed to button to prevent accidental native form reset behavior
                onClick={() => {
                  reset();
                  onSearch({}); // Passing empty object to clear filters on the server side
                }}
                className="bg-slate-700 hover:bg-slate-800 text-white"
              >
                <IoReload />
              </Button>
            </div>
          </div>
        )}
      </FormProviderWrapper>
    </div>
  );
};

export default SearchTarabi;
