const FridayCollectionRow = () => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium text-gray-900">
              #
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-gray-900">
              Job
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-gray-900">
              Favorite Color
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-3">1</td>
            <td className="px-4 py-3">Cy Ganderton</td>
            <td className="px-4 py-3">Quality Control Specialist</td>
            <td className="px-4 py-3">Blue</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-3">2</td>
            <td className="px-4 py-3">Hart Hagerty</td>
            <td className="px-4 py-3">Desktop Support Technician</td>
            <td className="px-4 py-3">Purple</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-3">3</td>
            <td className="px-4 py-3">Brice Swyre</td>
            <td className="px-4 py-3">Tax Accountant</td>
            <td className="px-4 py-3">Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FridayCollectionRow;
