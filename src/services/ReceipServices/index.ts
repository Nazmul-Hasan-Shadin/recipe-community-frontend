"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { Recipe } from "@/types";

export const getAllRecipe = async (
  searchTerm?: string,
  page?: number,
  limit?: number
) => {
  const res = await axiosInstance.get("recipe", {
    params: {
      searchTerm: searchTerm,
      page: page,
      limit: limit,
    },
  });

  return res.data;
};

export const getAllRecipeForuser = async (
  searchTerm?: string,
  page?: number,
  limit?: number
) => {
  const res = await axiosInstance.get("recipe/users-recipe", {
    params: {
      searchTerm: searchTerm,
      page: page,
      limit: limit,
    },
  });

  return res.data;
};

export const createRecipePost = async (recipieInfo: FormData) => {
  try {
    const response = await axiosInstance.post(`recipe`, recipieInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {}
};

export const increaseUpvote = async (id: string, type: string) => {
  try {
    const response = await axiosInstance.post(`user/${id}/upvote`, {
      recipeId: id,
      type: type,
    });

    return response.data; // Return only the relevant data from the response
  } catch (error) {
    throw error; // Rethrow the error so it can be handled by the calling function
  }
};

export const getUsersRecipe = async () => {
  const res = await axiosInstance.get("recipe/my-profile");

  // cookies().set('accessToken',res.data.accessToken)
  return res.data.data;
};

export const deleteRecipe = async (recipeId: string, isDeleted: boolean) => {
  const res = await axiosInstance.patch(`/recipe/delete/${recipeId}`, {
    isDeleted,
  });

  return res;
};

export const deleteRecipeByUser = async (recipeId: string) => {
  const res = await axiosInstance.delete(
    `recipe/delete-user-recipe/${recipeId}`
  );

  return res;
};

export const updateRecipePost = async (id: string, recipeInfo: FormData) => {
  try {
    const response = await axiosInstance.patch(`recipe/${id}`, recipeInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // Return the updated recipe data
  } catch (error) {
    throw error; // Propagate the error for further handling
  }
};

export const togglePublishRecipe = async (recipeId: string, action: string) => {
  const res = await axiosInstance.post(`/recipe/${recipeId}/toggle-publish`, {
    action,
  });
  return res.data;
};

export const rateRecipe = async (
  recipeId: string,
  userId: string,
  rating: number
) => {
  return await axiosInstance.patch(`/recipe/${recipeId}/rate`, { rating });
};
