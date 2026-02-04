"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useStaffStatusMutation } from "@/src/redux/features/staff/staffApi";

interface StatusToggleProps {
  staffId: string;
  currentStatus: boolean;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({
  staffId,
  currentStatus,
}) => {
  const [staffStatus, { isLoading }] = useStaffStatusMutation();
  const [active, setActive] = useState(currentStatus);

  const handleChange = async () => {
    try {
      setActive(!active); // Optimistic UI update
      await staffStatus({
        id: staffId,
        data: { status: !active },
      }).unwrap();

      Swal.fire(
        "Success!",
        `Staff is now ${!active ? "Active" : "Inactive"}.`,
        "success"
      );
    } catch (err) {
      // Revert UI if error occurs
      setActive(active);
      Swal.fire("Failed!", "Could not update status.", "error");
    }
  };

  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={active}
        disabled={isLoading}
        onChange={handleChange}
      />
      <div className="w-10 h-4 bg-gray-300 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[-2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  );
};
