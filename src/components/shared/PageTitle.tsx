import React from "react";
import { FaCaretRight, FaHome } from "react-icons/fa";

type TProps = {
  routes: string[];
};

function PageTitle({ routes }: TProps) {
  return (
    <div className="flex flex-row items-center space-x-1 mb-5">
      <FaHome className="text-teal-700" />
      {routes?.map((item, index) => (
        <p
          key={index}
          className="text-sm flex flex-row items-center font-semibold text-gray-500"
        >
          <FaCaretRight />
          {` ${item}`}
        </p>
      ))}
    </div>
  );
}

export default PageTitle;
