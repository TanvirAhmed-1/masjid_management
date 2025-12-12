"use client";

import { useGetFridayCollectionsQuery } from "@/src/redux/features/collection/fridayCollection";
import { AddFridayCollectionModal } from "./AddFridayCollectionModal";
import FridayCollectionRow from "./FridayCollectionRow";
import SearchFridayCollection from "./SearchFridayCollection";

const FridayCollectionContainer = () => {
  const { data, isLoading, isError } = useGetFridayCollectionsQuery(undefined);
  console.log("Friday Collections Data:", data);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black">
          {" "}
          All Friday-Collection
        </h3>
        <AddFridayCollectionModal />
      </div>
      <div>
        <SearchFridayCollection />

        {/* table section */}
        <FridayCollectionRow
          data={data?.data}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default FridayCollectionContainer;
