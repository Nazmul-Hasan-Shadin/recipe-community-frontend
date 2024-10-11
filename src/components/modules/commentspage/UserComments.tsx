"use client";

import { useState } from "react";
import {
  useDeleteComment,
  useEditComment,
  useGetAllComment,
  useGetUserWhoDoComment,
} from "@/src/hooks/comments.hooks";
import { TUser } from "@/types";
import Image from "next/image";
import { toast } from "sonner";

const UserComments = ({
  comment,
  recipeId,
}: {
  comment: {
    content: string;
    userId?: TUser;
    recipeid?: string;
    profilePicture?: {};
    _id: string;
  };
  recipeId: string;
}) => {
  const { mutate: handleDelete } = useDeleteComment();
  const { mutate: handleUpdateComment } = useEditComment(); // Use this mutation for updating comments

  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const toggleOptions = () => setShowOptions((prev) => !prev);

  const handleEdit = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  const handleUpdate = () => {
    setLoading(true);
    handleUpdateComment(
      { commentId: comment._id, content: editedContent },
      {
        onSuccess: () => {
          toast.success("Comment updated successfully");
          setIsEditing(false);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Error updating comment:", error);
          toast.error("Failed to update comment.");
          setLoading(false);
        },
      }
    );
  };

  const confirmDelete = () => {
    handleDelete(comment._id);
  };

  return (
    <div
      key={comment._id}
      className="border-b border-gray-300 py-4 flex space-x-4 items-start relative"
    >
      <Image
        src={
          comment?.userId?.profilePicture || "https://via.placeholder.com/40"
        }
        alt="User avatar"
        className="rounded-full shadow-lg"
        width={50}
        height={50}
      />
      <div className="bg-white p-3 shadow-md rounded-lg flex-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">
            {comment?.userId?.username || "Anonymous"}
          </p>
          <span className="text-gray-500 text-xs">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border rounded p-2"
              rows={3}
            />
            <div className="flex space-x-2 mt-2">
              <button
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {comment?.content}
          </p>
        )}
      </div>
      <div className="relative">
        <button
          onClick={toggleOptions}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &#x2026;
        </button>
        {showOptions && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden z-10">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComments;
