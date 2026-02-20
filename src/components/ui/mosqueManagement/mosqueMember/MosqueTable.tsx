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
  if (isLoading || isFetching) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading mosque members...
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">No members found.</div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Phone
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Gender
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Mosque
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.data.map((member, index) => (
            <tr key={member.id} className="hover:bg-gray-50">
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MosqueTable;
