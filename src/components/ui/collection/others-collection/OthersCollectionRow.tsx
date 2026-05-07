import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";
import { useConfirm } from "@/src/components/shared/useConfirm";
import { useDeleteCollectionMutation } from "@/src/redux/features/collection/collections";
import Link from "next/link";
import { OtherCollectionType } from "@/src/types/collectionType";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import FetchingLoader from "@/src/components/shared/FetchingLoader";

type Props = {
  data: OtherCollectionType[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  limit: number;
  isFetching: boolean;
};

const OthersCollectionRow = ({
  data,
  isLoading,
  isError,
  page,
  limit,
  isFetching,
}: Props) => {
  const [deleteCollection] = useDeleteCollectionMutation();
  const { confirm, success, error } = useConfirm();

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


  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr className="text-center *:px-4 *:py-3 *:whitespace-nowrap">
            <th>Serial No</th>
            <th>Collection Title</th>
            <th>Donors</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={5} className="py-10">
                <LoaderScreen className="h-auto" />
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={5} className="py-10 text-center text-red-500">
                Error loading data.
              </td>
            </tr>
          ) : !data || data.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-500">
                No collections found.
              </td>
            </tr>
          ) : (
            data.map((collection, index) => {
              const totalAmount = collection.donors.reduce(
                (acc, donor) => acc + donor.amount,
                0,
              );

              return (
                <tr
                  key={collection.id}
                  className="hover:bg-gray-50 text-center *:whitespace-nowrap"
                >
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td className="px-4 py-3">
                    {collection.otherCollectionName.title}
                  </td>
                  <td className="px-4 py-3">
                    {collection.donors.length > 0
                      ? collection.donors.length
                      : "-"}
                  </td>
                  <td className="px-4 py-3">{totalAmount}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      {/* View Button */}
                      <Link href={`/others-collection/${collection.id}`}>
                        <Button
                          type="button"
                          className="bg-teal-500 hover:bg-teal-700 text-white rounded cursor-pointer"
                          size="sm"
                          title="View"
                        >
                          <FaEye /> Doners ({collection.donors.length})
                        </Button>
                      </Link>

                      {/* <EditCollectionModal data={collection} /> */}

                      {/* Delete */}
                      <Button
                        type="button"
                        onClick={() => handleDelete(collection.id)}
                        className="bg-red-500 hover:bg-red-700 text-white rounded cursor-pointer"
                        size="sm"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OthersCollectionRow;
