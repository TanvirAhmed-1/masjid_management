"use client";

import CreateCollectionName from "./CreateCollectionName";
import SearchCollectionName from "./SearchCollectionName";
import CollectionTable from "./CollectionTable";
import { useGetCollectionDataSetUpQuery } from "@/src/redux/features/collection/collectionDataSetUp";

const CollectionNameContainer = () => {
  const { data, isLoading, isError } = useGetCollectionDataSetUpQuery(undefined);
  console.log("Friday Collections Data:", data);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black">
          {" "}
          All Collection Names
        </h3>
        <CreateCollectionName />
      </div>
      <div>
        <SearchCollectionName />

        {/* table section */}
        <CollectionTable
          data={data?.data}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default CollectionNameContainer;
