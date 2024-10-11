"use client";
import {
  useChangeUserStatus,
  useDeleteUser,
  useGetAllUsers,
} from "@/src/hooks/auth.user";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
// Import appropriate hooks for users

interface User {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  status: string;
}

const UserTable: React.FC = () => {
  const { data: allUsers, isLoading, error } = useGetAllUsers();
  const [users, setUsers] = useState<User[]>([]);
  const { mutate: handleDeleteUser } = useDeleteUser();
  const { mutate: handleToggleUserStatus } = useChangeUserStatus();
  console.log(allUsers, "all users");

  useEffect(() => {
    if (allUsers && allUsers.data) {
      setUsers(
        allUsers?.data?.map((user: any) => ({
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          status: user.status,
        }))
      );
    }
  }, [allUsers]);

  const handleStatusToggle = (id: string) => {
    const updatedUser = users.find((user) => user.id === id);
    if (updatedUser) {
      const status = updatedUser.status === "active" ? "block" : "active";

      // Optimistically update UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                status: updatedUser.status === "active" ? "block" : "active",
              }
            : user
        )
      );

      handleToggleUserStatus(
        { id, status },
        {
          onSuccess: () => {
            toast.success(`User ${status}ed successfully!`);
          },
          onError: (error) => {
            // Revert state on error
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === id ? { ...user, status: updatedUser.status } : user
              )
            );
            toast.error(`Failed to ${status} user: ${error.message}`);
          },
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    const updatedUser = users.find((user) => user.id === id);
    if (updatedUser) {
      // Optimistically update UI
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      handleDeleteUser(id, {
        onSuccess: () => {
          toast.success("User deleted successfully!");
        },
        onError: (error) => {
          // Revert state on error
          setUsers((prevUsers) => [...prevUsers, updatedUser]);
          toast.error(`Failed to delete user: ${error.message}`);
        },
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error fetching users: {error.message}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-600">
              Profile
            </th>
            <th className="p-3 text-left font-semibold text-gray-600">
              Username
            </th>
            <th className="p-3 text-left font-semibold text-gray-600">Email</th>
            <th className="p-3 text-center font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className={`p-2 rounded ${
                        user.status === "active"
                          ? "bg-gray-500"
                          : "bg-green-500"
                      } text-white`}
                      onClick={() => handleStatusToggle(user.id)}
                    >
                      {user.status === "active" ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      className="p-2 rounded bg-red-500 text-white"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
