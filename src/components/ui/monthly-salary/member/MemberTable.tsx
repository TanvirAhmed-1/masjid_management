"use client";

import EditMemberModal from "./EditMemberModal";
import { Button } from "@/src/components/ui/button";
import {
  useDeleteMemberMutation,
  useGetMembersQuery,
} from "@/src/redux/features/monthly-salary/memberApi";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MemberPaymentSummaryModal from "../monthly-payment/MemberPaymentSummaryModal";

const MemberTable = () => {
  const { data: members, isLoading, isError } = useGetMembersQuery(undefined);
  const [deleteMember] = useDeleteMemberMutation();


   const handleDelete = async (id: string) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be Delete this Item!",
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
              text: "Year has been deleted successfully.",
              icon: "success",
              timer: 1000,
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

  if (isLoading) return <div>Loading members...</div>;
  if (isError) return <div>Failed to load members</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr className="text-center text-sm font-medium text-gray-900  *:py-2 *:px-3 ">
            <th>Serial No</th>
            <th >Name</th>
            <th >Phone</th>
            <th >Address</th>
            <th >Monthly Amount</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members?.result.map((member: any, index: number) => (
            <tr key={member.id} className="text-base *:text-center *:py-2 *:px-3">
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.phone || "-"}</td>
              <td>{member.address || "-"}</td>
              <td>{member.monthlyAmount}</td>
              <td className=" flex justify-center gap-2">
                <MemberPaymentSummaryModal memberId={member.id} memberName={member.name} />
                <EditMemberModal member={member} />
                <Button
                  type="button"
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2  shadow-sm transition-all duration-200"
                  size="sm"
                  title="Delete"
                >
                  <FaTrashAlt size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
