"use client";

import { useGetAllUsersQuery } from "@/src/redux/features/auth/authApi";

type User = {
  _id: string;
  name?: string;
  username: string;
  category?: string;
};

export default function UserList() {
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <p>Loading users...</p>;

  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : "error" in error
        ? (error.error as string)
        : "Error loading users.";
    return <p className="text-red-600">{errorMessage}</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>
      <ul className="space-y-2">
        {users?.map((user: User) => (
          <li key={user._id} className="p-3 border rounded shadow-sm">
            <p>
              <strong>Name:</strong> {user.name || user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.username}
            </p>
            <p>
              <strong>Category:</strong> {user.category}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
