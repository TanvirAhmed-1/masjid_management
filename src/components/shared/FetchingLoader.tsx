import { Loader2 } from "lucide-react";
import React from "react";

const FetchingLoader = () => {
  return (
    <div className="flex justify-center items-center py-8 h-[60vh]">
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
      </div>
    </div>
  );
};

export default FetchingLoader;
