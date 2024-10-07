"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { Recipe } from "@/types";

export const getAllRecipe = async () => {
  const res = await axiosInstance.get("recipe");

  // cookies().set('accessToken',res.data.accessToken)
  console.log(res.data.data.data);

  console.log(res, "iamr res");
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
  console.log("insdinde increaseupvote", id);

  const response = await axiosInstance.post(`user/${id}/upvote`, {
    recipeId: id,
    type: type,
  });
  console.log(response.data, "hfffffffffffffffffffffffffi");
  return response;
};

export const getUsersRecipe = async () => {
  const res = await axiosInstance.get("recipe/my-profile");

  // cookies().set('accessToken',res.data.accessToken)
  console.log(res.data);
  return res;
};
