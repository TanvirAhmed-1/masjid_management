"use client";

import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../../button";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useDeleteStaffMutation } from "@/src/redux/features/staff/staffApi";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import FetchingLoader from "@/src/components/shared/FetchingLoader";

export interface IMonthlySalary {
  id: string;
  month: string; // ISO Date string
  staffId: string;
  totalSalary: number;
  createdAt: string;
  updatedAt: string;
  mosqueId: string;
  userId: string;

  staff: IStaff;
  payments: ISalaryPayment[];
}

export interface IStaff {
  id: string;
  name: string;
  image: string | null;
  address: string;
  phone: string | null;
  role: string;
  baseSalary: number;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  mosqueId: string;
  userId: string;
}

export interface ISalaryPayment {
  id: string;
  amount: number;
  payDate: string;
  createdAt: string;
  salaryId: string;
  mosqueId: string;
  userId: string;
}

type Props = {
  data: IMonthlySalary[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};

const StaffPaymentRow: React.FC<Props> = ({
  data,
  isLoading,
  isFetching,
  page,
  limit,
}) => {
  const [deleteStaff] = useDeleteStaffMutation();

  if (isLoading) return <LoaderScreen />;
  if (isFetching) return <FetchingLoader />;

  if (!data.length) {
    return <p className="text-center py-6 text-gray-600">No Data Available</p>;
  }

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteStaff(id).unwrap();
        Swal.fire("Deleted!", "Staff removed successfully.", "success");
      } catch {
        Swal.fire("Failed!", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="w-full mx-auto overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-teal-600 text-white">
          <tr className="*:text-center *:px-2 *:py-3 *:whitespace-nowrap">
            <th>SN</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Month</th>
            <th>Role</th>
            <th>Status</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y bg-white">
          {data?.map((row: IMonthlySalary, index) => (
            <tr key={row.id} className="hover:bg-gray-50 text-center *:p-2 *:whitespace-nowrap  ">
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{row.staff.name}</td>
              <td>{row.staff.phone}</td>
              <td>{row.totalSalary}</td>
              <td>{format(new Date(row?.month), "dd/MM/yyyy")}</td>
              <td>{row.staff.role}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    row.staff.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {row.staff.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>{row.staff.baseSalary}</td>
              <td>
                <div className="flex justify-center gap-2">
                  {/* <EditStaffPaymentModal staff={row} /> */}
                  <Button
                    size="sm"
                    onClick={() => handleDelete(row.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <FaTrashAlt size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPaymentRow;
