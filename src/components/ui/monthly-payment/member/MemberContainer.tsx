"use client";

import MemberModal from "./MemberModal";
import MemberTable from "./MemberTable";
import SearchMember from "./SearchMember";

const MemberContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl">
          All Ramadan Year List
        </h3>
        <MemberModal />
      </div>
      <div>
        <SearchMember />

        {/* table section */}
        <MemberTable />
      </div>
    </div>
  );
};

export default MemberContainer;
