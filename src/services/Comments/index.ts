"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const getSingleUser = async (userId: string) => {
  const res = await axiosInstance.get(`/user/${userId}`);

  // cookies().set('accessToken',res.data.accessToken)

  return res;
};

export const makeComment = async (recipeId: string, content: string) => {
  try {
    const res = await axiosInstance.post(`/recipe/${recipeId}/comments`, {
      content,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
  // cookies().set('accessToken',res.data.accessToken)
};

export const getAllComment = async (recipeId: string) => {
  try {
    const res = await axiosInstance.get(`/recipe/${recipeId}/comments`);

    return res;
  } catch (error) {
    console.log(error);
  }
  // cookies().set('accessToken',res.data.accessToken)
};

export const deleteComment = async (commentId: string): Promise<void> => {
  console.log(commentId, "iam commentId");

  try {
    const result = await axiosInstance.delete(`/recipe/${commentId}/comments`);
    console.log(result);
  } catch (error) {
    throw new Error("Failed to delete comment.");
  }
};

interface EditCommentParams {
  commentId: string;
  content: string;
}

export const editComment = async ({
  commentId,
  content,
}: EditCommentParams) => {
  const response = await axiosInstance.put(`/recipe/comments/${commentId}`, {
    content,
  });
  return response.data;
};
