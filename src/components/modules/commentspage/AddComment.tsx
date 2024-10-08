"use client";
import { useMakeComment } from "@/src/hooks/comments.hooks";
import { useState } from "react";

// AddComment component for user input
export const AddComment = ({ recipeId }: { recipeId: string }) => {
  const { mutate: handleAddComment } = useMakeComment();
  const [comment, setComment] = useState("");

  // Handle comment submission
  const handleSubmit = async () => {
    if (comment.trim()) {
      console.log("Submit comment:", comment);

      handleAddComment({ recipeId, content: comment });
      setComment(""); // Clear the input after submitting
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <textarea
        className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={4}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          onClick={() => setComment("")}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          onClick={handleSubmit}
        >
          Comment
        </button>
      </div>
    </div>
  );
};
