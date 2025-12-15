"use client";

import { useGetCollectionByIdQuery } from "@/src/redux/features/collection/collections";
import ManageCollectionTable from "./ManageCollectionTable";
import SearchManageCollection from "./SearchManageCollection";
import CreateDonerModal from "./CreateDonerModal";

export type Donor = {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
};

type OtherCollectionName = {
  title: string;
};

export type CollectionType = {
  id: string;
  donors: Donor[];
  date: string | null;
  otherCollectionNameId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  otherCollectionName: OtherCollectionName;
};

const ManageCollectionContainer = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetCollectionByIdQuery(id);

  const collections: CollectionType[] = data?.result ? [data.result] : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">
          Manage Collection Donor
        </h3>
        <CreateDonerModal id={id} />
      </div>

      <SearchManageCollection />

      <ManageCollectionTable
        data={collections}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default ManageCollectionContainer;
