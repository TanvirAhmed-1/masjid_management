"use client";
import React from "react";

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  createdAt: string;
  mosque?: {
    name: string;
  };
};

type Props = {
  data: { success: boolean; data: Member[] } | undefined;
  isLoading: boolean;
  isFetching: boolean;
};

const MosqueTable = ({ data, isLoading, isFetching }: Props) => {
  return (
    <div className="overflow-x-auto mt-4 rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-600 text-white">
          <tr className="*:px-4 *:py-2 *:text-center *:text-sm *:font-semibold *:whitespace-nowrap">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Mosque</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={7} className="py-10 text-center">
                Loading mosque members...
              </td>
            </tr>
          ) : !data || data.data.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-10 text-center text-gray-500">
                No members found.
              </td>
            </tr>
          ) : (
            data.data.map((member, index) => (
              <tr key={member.id} className="hover:bg-gray-50 text-center">
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{member.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {member.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {member.phone}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {member.gender}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {member.mosque?.name || "-"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(member.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MosqueTable;
