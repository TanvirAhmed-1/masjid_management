"use client";
import React, { useState } from "react";
import MemberCreate from "./CreateMember";
import SearchmosqueMember from "./SearchmosqueMember";
import MosqueTable from "./MosqueTable";
import { clearqueryObject } from "@/src/utils/clearqueryObject";
import { useGetMosqueMembersQuery } from "@/src/redux/features/mosqueManagement/mosqueMemberApi";
type SearchFormValues = {
  name?: string;
  phone?: string;
  email?: string;
};
const MosqueMemberContainer = () => {
  const [filters, setFilters] = useState<SearchFormValues | undefined>();
  const handleSearch = (data?: SearchFormValues) => {
    const cleaned = clearqueryObject(data);
    setFilters(cleaned);
  };
  const { data, isLoading, isFetching } = useGetMosqueMembersQuery({
    ...filters,
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Mosque Member List
        </h3>
        <MemberCreate />
      </div>
      <div>
        <SearchmosqueMember onSearch={handleSearch} />

        {/* table section */}
        <MosqueTable
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default MosqueMemberContainer;
