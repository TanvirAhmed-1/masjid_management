"use client";

import React from "react";
import AddOthersCollectionModal from "./AddOthersCollectionModal";
import OthersCollectionRow from "./OthersCollectionRow";
import SearchOthersCollection from "./SearchOthersCollection";
import { useGetCollectionQuery } from "@/src/redux/features/collection/collections";

export type Donor = {
  name: string;
  amount: number;
  createdAt: string; // ISO string
};

export type OtherCollectionName = {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};

export type OtherCollectionType = {
  id: string;
  donors: Donor[];
  date: string | null; // nullable
  otherCollectionNameId: string;
  userId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  otherCollectionName: OtherCollectionName;
};
const OthersCollectionContainer = () => {
  const { data, isLoading, isError } = useGetCollectionQuery(undefined);
  console.log("Others Collections Data:", data);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black">
          {" "}
          All Others Collection
        </h3>
        <AddOthersCollectionModal />
      </div>
      <div>
        <SearchOthersCollection />

        {/* table section */}
        <OthersCollectionRow
          data={data?.result}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default OthersCollectionContainer;
