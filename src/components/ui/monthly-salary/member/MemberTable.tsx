"use client";

import React from "react";

import EditMemberModal from "./EditMemberModal";
import { Button } from "@/src/components/ui/button";
import {
  useDeleteMemberMutation,
  useGetMembersQuery,
} from "@/src/redux/features/monthly-salary/memberApi";

const MemberTable = () => {
  const { data: members, isLoading, isError } = useGetMembersQuery(undefined);
  const [deleteMember] = useDeleteMemberMutation();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        await deleteMember(id).unwrap();
        alert("Member deleted successfully");
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  if (isLoading) return <div>Loading members...</div>;
  if (isError) return <div>Failed to load members</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Monthly Amount</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members?.result.map((member: any) => (
            <tr key={member.id}>
              <td className="px-4 py-2">{member.name}</td>
              <td className="px-4 py-2">{member.phone || "-"}</td>
              <td className="px-4 py-2">{member.address || "-"}</td>
              <td className="px-4 py-2">{member.monthlyAmount}</td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <EditMemberModal member={member} />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  Delete
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
