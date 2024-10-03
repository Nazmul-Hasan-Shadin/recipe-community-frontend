"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const getAllRecipe = async () => {
  const res = await axiosInstance.get("recipe");

  // cookies().set('accessToken',res.data.accessToken)
  console.log(res.data.data.data);

  console.log(res, "iamr res");
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
