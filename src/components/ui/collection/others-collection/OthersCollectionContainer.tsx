"use client";

import React from "react";
import AddOthersCollectionModal from "./AddOthersCollectionModal";
import OthersCollectionRow from "./OthersCollectionRow";
import SearchOthersCollection from "./SearchOthersCollection";

const OthersCollectionContainer = () => {
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
        <OthersCollectionRow />
      </div>
    </div>
  );
};

export default OthersCollectionContainer;
