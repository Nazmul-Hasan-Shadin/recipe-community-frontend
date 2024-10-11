"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { Recipe } from "@/types";

export const getAllRecipe = async (
  searchTerm?: string,
  page?: number,
  limit?: number
) => {
  console.log(searchTerm, page, limit);
  const res = await axiosInstance.get("recipe", {
    params: {
      searchTerm: searchTerm,
      page: page,
      limit: limit,
    },
  });

  console.log(res.data);

  return res.data;
};

export const createRecipePost = async (recipieInfo: FormData) => {
  console.log(recipieInfo, "iam create recipe serverice");

  try {
    console.log("isdie try");

    const response = await axiosInstance.post(`recipe`, recipieInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response, "recope post");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const increaseUpvote = async (id: string, type: string) => {
  try {
    console.log(`Attempting to increase upvote for ID: ${id}, Type: ${type}`);

    const response = await axiosInstance.post(`user/${id}/upvote`, {
      recipeId: id,
      type: type,
    });

    console.log("Upvote increase successful:", response.data);
    return response.data; // Return only the relevant data from the response
  } catch (error) {
    console.error(`Failed to increase upvote for ID: ${id}. Error:`, error);
    throw error; // Rethrow the error so it can be handled by the calling function
  }
};

export const getUsersRecipe = async () => {
  const res = await axiosInstance.get("recipe/my-profile");

  // cookies().set('accessToken',res.data.accessToken)
  console.log(res.data);
  return res;
};

export const deleteRecipe = async (recipeId: string, isDeleted: boolean) => {
  const res = await axiosInstance.patch(`/recipe/delete/${recipeId}`, {
    isDeleted,
  });

  console.log(res.data);
  return res;
};
export const updateRecipePost = async (id: string, recipeInfo: FormData) => {
  console.log("Updating recipe with ID:", id);

  try {
    const response = await axiosInstance.patch(`recipe/${id}`, recipeInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Recipe updated successfully:", response.data);
    return response.data; // Return the updated recipe data
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error; // Propagate the error for further handling
  }
};

export const togglePublishRecipe = async (recipeId: string, action: string) => {
  const res = await axiosInstance.post(`/recipe/${recipeId}/toggle-publish`, {
    action,
  });
  console.log(res.data);
  return res.data;
};

export const rateRecipe = async (
  recipeId: string,
  userId: string,
  rating: number
) => {
  return await axiosInstance.patch(`/recipe/${recipeId}/rate`, { rating });
};
