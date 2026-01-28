"use client";

import EditMemberModal from "./EditMemberModal";
import { Button } from "@/src/components/ui/button";
import { useDeleteMemberMutation } from "@/src/redux/features/monthly-salary/memberApi";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MemberPaymentSummaryModal from "./MemberPaymentSummaryModal";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import FetchingLoader from "@/src/components/shared/FetchingLoader";
import { MemberType } from "./MemberContainer";
type Props = {
  members: MemberType[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};

const MemberTable = ({
  members,
  isLoading,
  isFetching,
  page,
  limit,
}: Props) => {
  const [deleteMember] = useDeleteMemberMutation();

  console.log("Members data:", members);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMember(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Member has been deleted successfully.",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });

          console.log("Delete successfully", res);
        } catch (error) {
          Swal.fire({
            title: "Failed!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) return <LoaderScreen />;
  if (isFetching) return <FetchingLoader />;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-center text-sm font-medium text-gray-900 *:py-2 *:px-3">
            <th>SN</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {members?.map((member: MemberType, index: number) => (
            <tr
              key={member.id}
              className="text-base *:text-center *:py-2 *:px-3 hover:bg-gray-50"
            >
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{member.name}</td>
              <td>{member.phone || "-"}</td>
              <td>{member.address || "-"}</td>
              <td>{member.monthlyAmount}</td>

              <td>
                <div className="flex justify-center items-center gap-2">
                  <MemberPaymentSummaryModal
                    memberId={member.id}
                    memberName={member.name}
                  />

                  <EditMemberModal member={member} />

                  <Button
                    type="button"
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 shadow-sm transition-all duration-200"
                    size="sm"
                    title="Delete"
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

export default MemberTable;
