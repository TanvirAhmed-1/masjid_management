"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";

type PaginationWithLimitProps = {
  page: number;
  totalPage: number;
  totalRecords: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  className?: string;
};

const Pagination = ({
  page,
  totalPage,
  totalRecords,
  limit,
  onPageChange,
  className = "",
}: PaginationWithLimitProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center mt-4 gap-2 ${className}`}
    >
      {/* Left: Records info */}
      <div className="text-sm text-gray-600">
        Showing {limit} items | Page {page} of {totalPage} | Total{" "}
        {totalRecords} records
      </div>

      {/* Right: PageSize + Buttons */}
      <div className="flex gap-2 items-center justify-center">
        <Button
          className="py-0 px-2 text-xs cursor-pointer"
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(page - 1, 1))}
        >
          Prev
        </Button>

        <span className="text-xs">
          Page {page} of {totalPage}
        </span>

        <Button
          className="py-0 px-2 text-xs cursor-pointer"
          disabled={page === totalPage || totalPage === 0}
          onClick={() => onPageChange(Math.min(page + 1, totalPage))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
