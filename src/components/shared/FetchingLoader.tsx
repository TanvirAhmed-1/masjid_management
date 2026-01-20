import React from "react";

const FetchingLoader = () => {
  return (
    <div className="flex justify-center items-center py-8 h-[60vh]">
      <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default FetchingLoader;
