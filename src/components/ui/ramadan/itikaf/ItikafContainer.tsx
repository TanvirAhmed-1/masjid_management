"use client";

import AddItikafModal from "./AddItikafModal";
import ItikafRow from "./ItikafRow";

import SearchItikaf from "./SearchItikaf";

const ItikafContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Itikaf Participant List
        </h3>
        <AddItikafModal />
      </div>
      <div>
        <SearchItikaf />

        {/* table section */}
        <ItikafRow />
      </div>
    </div>
  );
};

export default ItikafContainer;
