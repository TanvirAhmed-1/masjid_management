import React from "react";
import EditFridayCollectionModal from "./EditFridayCollectionModal";
import { Button } from "../../button";
import { useDeleteFridayCollectionMutation } from "@/src/redux/features/collection/fridayCollection";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { FaTrashAlt } from "react-icons/fa";

type User = {
  name: string;
  email: string;
};
export type Collection = {
  id: string;
  amount: number;
  collectionDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

type Props = {
  data?: Collection[];
  isLoading: boolean;
  isError: boolean;
};

const FridayCollectionRow: React.FC<Props> = ({ data, isLoading, isError }) => {
  const { confirm, success, error } = useConfirm();
  const [deleteFridayCollection] = useDeleteFridayCollectionMutation();
  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm(
      "Are you sure you want to delete this collection?"
    );
    if (!isConfirmed) return;

    deleteFridayCollection(id)
      .unwrap()
      .then(() => {
        success("Friday Collection deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting Friday Collection:", err);
        error("Failed to delete Friday Collection");
      });
  };

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Error fetching data.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr className="*:text-center *:px-4 *:py-3">
            <th>Serial No</th>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data && data?.length > 0 ? (
            data?.map((item: Collection, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-50 *:text-center *:px-4 *:py-3"
              >
                <td>{index + 1}</td>
                <td>{item.user.name}</td>
                <td>{new Date(item.collectionDate).toLocaleDateString()}</td>
                <td>{item.amount}</td>
                <td className="  space-x-2">
                  <EditFridayCollectionModal collection={item} />
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

export default FridayCollectionRow;
