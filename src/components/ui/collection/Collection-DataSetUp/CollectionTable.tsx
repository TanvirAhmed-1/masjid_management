import React from "react";
import { Button } from "../../button";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { FaTrashAlt } from "react-icons/fa";
import EditFCollectionName from "./EditFCollectionName";
import { useDeleteCollectionDataSetUpMutation } from "@/src/redux/features/collection/collectionDataSetUp";
import { format } from "date-fns";
import LoaderScreen from "@/src/components/shared/LoaderScreen";

export interface CollectionType {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  data?: CollectionType[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  limit: number;
};

const CollectionTable: React.FC<Props> = ({
  data,
  isLoading,
  isError,
  page,
  limit,
}) => {
  const { confirm, success, error } = useConfirm();
  const [deleteCollection] = useDeleteCollectionDataSetUpMutation();
  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm(
      "Are you sure you want to delete this collection?",
    );
    if (!isConfirmed) return;

    deleteCollection(id)
      .unwrap()
      .then(() => {
        success("Collection deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting Collection:", err);
        error("Failed to delete Collection");
      });
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Error fetching data.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr className="*:text-center *:px-4 *:py-3 *:whitespace-nowrap">
            <th>Serial No</th>
            <th>Title Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data && data?.length > 0 ? (
            data?.map((item: CollectionType, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-50 *:text-center *:px-4 *:py-3 *:whitespace-nowrap "
              >
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{item.title}</td>
                <td>{format(new Date(item.createdAt), "PPP")}</td>
                <td>{item.description}</td>
                <td className="  space-x-2">
                  <EditFCollectionName collection={item} />
                  <Button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 shadow-sm transition-all duration-200"
                    size="sm"
                    title="Delete"
                  >
                    <FaTrashAlt size={14} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionTable;
