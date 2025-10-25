"use client";

import RamadanModal from "./RamadanModal";
import RamadanRow from "./RamadanRow";
import SearchRamadan from "./SearchRamadan";

const RamadanDataSetUpContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Ramadan Year List
        </h3>
        <RamadanModal />
      </div>
      <div>
        <SearchRamadan />

        {/* table section */}
        <RamadanRow />
      </div>
    </div>
  );
};

export default RamadanDataSetUpContainer;
