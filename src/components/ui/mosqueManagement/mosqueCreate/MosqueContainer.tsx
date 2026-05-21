"use client";

import MosqueCreate from "./MosqueCreateModal";
import MosqueTable from "./MosqueTable";
import SearchMosque from "./Searchmosque";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

export interface MosqueUser {
  name: string;
  email: string;
}

export interface MosqueType {
  id: string;
  name: string;
  address: string;
  phone: string;
  createdAt: string;   // ISO date
  updatedAt: string;   // ISO date
  createdBy: string;
  users: MosqueUser[];
}

const MosqueContainer = () => {
  const { t } = useTranslationContext();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black md:text-3xl font-semibold">
          {t("mosque_table_title")}
        </h3>
        <MosqueCreate />
      </div>
      <div>
        <SearchMosque />

        {/* table section */}
        <MosqueTable />
      </div>
    </div>
  );
};

export default MosqueContainer;
