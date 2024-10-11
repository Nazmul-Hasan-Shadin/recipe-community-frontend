"use client";
import { useDeleteUser, useGetAllUsers } from "@/src/hooks/auth.user";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  role: string;
}

const AdminTable: React.FC = () => {
  const { data: allUsers, isLoading, error } = useGetAllUsers();
  const [admins, setAdmins] = useState<User[]>([]);
  const { mutate: handleDeleteUser } = useDeleteUser();
  const primaryColor = "#FF4500"; // Reddit logo color

  useEffect(() => {
    if (allUsers && allUsers.data) {
      setAdmins(
        allUsers.data
          .filter((user: any) => user.role === "admin")
          .map((user: any) => ({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            role: user.role,
          }))
      );
    }
  }, [allUsers]);

  const handleDelete = (id: string) => {
    const updatedAdmin = admins.find((admin) => admin.id === id);
    if (updatedAdmin) {
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));

      handleDeleteUser(id, {
        onSuccess: () => {
          toast.success("Admin deleted successfully!");
        },
        onError: (error) => {
          setAdmins((prevAdmins) => [...prevAdmins, updatedAdmin]);
          toast.error(`Failed to delete admin: ${error.message}`);
        },
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error fetching admins: {error.message}</div>
    );
  }

  return (
    <div className="overflow-x-auto p-6">
      <h1
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: primaryColor }}
      >
        Admin Management
      </h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left font-semibold text-gray-600">
              Profile
            </th>
            <th className="p-4 text-left font-semibold text-gray-600">
              Username
            </th>
            <th className="p-4 text-left font-semibold text-gray-600">Email</th>
            <th className="p-4 text-center font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={admin.profilePicture}
                    alt={admin.username}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-4">{admin.username}</td>
                <td className="p-4">{admin.email}</td>
                <td className="p-4 text-center">
                  <button
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
                    onClick={() => handleDelete(admin.id)}
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No admins available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
