import DashboardLayout from "@/src/layout/DashboardLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardLayout> {children}</DashboardLayout>
    </div>
  );
};

export default layout;
