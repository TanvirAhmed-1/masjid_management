"use client";

import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { useDeleteCollectionMutation } from "@/src/redux/features/collection/collections";
import { CollectionType } from "./ManageCollectionContainer";

type Props = {
  data?: CollectionType[];
  isLoading: boolean;
  isError: boolean;
};

const ManageCollectionTable = ({ data = [], isLoading, isError }: Props) => {
  const [deleteCollection] = useDeleteCollectionMutation();
  const { confirm, success, error } = useConfirm();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;
  if (data.length === 0) return <div>No donors found.</div>;

  const donors = data.flatMap((collection) =>
    collection.donors.map((donor) => ({
      ...donor,
      collectionId: collection.id,
    }))
  );

  const handleDelete = async (collectionId: string) => {
    const isConfirmed = await confirm(
      "Are you sure you want to delete this collection?"
    );
    if (!isConfirmed) return;

    try {
      await deleteCollection(collectionId).unwrap();
      success("Collection deleted successfully");
    } catch (err) {
      console.error("Error deleting Collection:", err);
      error("Failed to delete Collection");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse bg-white text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="px-4 py-3">SL</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {donors.map((donor, idx) => (
            <tr key={`${donor.name}-${idx}`} className="text-center">
              <td className="px-4 py-3">{idx + 1}</td>
              <td className="px-4 py-3">{donor.name}</td>
              <td className="px-4 py-3 font-medium">{donor.amount}</td>
              <td className="px-4 py-3">
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(donor.collectionId)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCollectionTable;
