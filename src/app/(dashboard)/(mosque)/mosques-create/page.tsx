"use client";

import MosqueContainer from "@/src/components/ui/mosqueManagement/mosqueCreate/MosqueContainer";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/src/redux/hook";
import { useRouter } from "next/navigation";

const Page = () => {
  const role = useAppSelector((state) => state.auth.role);
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (role) {
      if (role !== "SUPER_ADMIN") {
        router.replace("/");
      } else {
        setIsAllowed(true);
      }
    }
  }, [role, router]);

  if (!isAllowed) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <MosqueContainer />
    </div>
  );
};

export default Page;
