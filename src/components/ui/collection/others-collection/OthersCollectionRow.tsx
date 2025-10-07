import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";

const OthersCollectionRow = () => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-gray-100 ">
          <tr className="*:px-4 *:py-3 *:font-medium *:text-gray-900 *:text-center">
            <th>Serial No</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50 *:px-4 *:py-3 *:text-center">
            <td>1</td>
            <td>Tanvir</td>
            <td>2000</td>
            <td>Mosjid nirmaner junno</td>
            <td>
              {" "}
              <div className=" flex flex-row gap-2 justify-center items-center">
                {/* View Button */}
                <Button
                  type="button"
                  className="bg-teal-500 hover:bg-teal-600 text-white rounded cursor-pointer"
                  size="sm"
                  title="View"
                >
                  <FaEye />
                </Button>

                {/* Edit */}
                <Button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded cursor-pointer"
                  size="sm"
                  title="Edit"
                >
                  <FaEdit />
                </Button>

                {/* Delete */}
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white rounded cursor-pointer"
                  size="sm"
                  title="Delete"
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OthersCollectionRow;
