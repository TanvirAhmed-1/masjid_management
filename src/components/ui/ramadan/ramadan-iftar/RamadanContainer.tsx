"use client";

import AddOthersCollectionModal from "./AddRamadanModal";
import IftarListRow from "./IftarListRow";
import SearchiftarList from "./SearchiftarList";

const RamadanContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Ramadan Iftar List
        </h3>
        <AddOthersCollectionModal />
      </div>
      <div>
        <SearchiftarList />

        {/* table section */}
        <IftarListRow />
      </div>
    </div>
  );
};

export default RamadanContainer;
