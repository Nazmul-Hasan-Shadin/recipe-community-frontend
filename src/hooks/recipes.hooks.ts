"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRecipePost,
  getAllRecipe,
  getUsersRecipe,
  increaseUpvote,
} from "../services/ReceipServices";

export const useGetAllRecipe = () => {
  return useQuery({
    queryKey: ["allrecipe"],
    queryFn: async (userData) => await getAllRecipe(),
  });
};

export const useCreateRecipe = () => {
  return useMutation({
    mutationKey: ["createRecipe"],
    mutationFn: async (recipeInfo) => {
      console.log(recipeInfo, "inside hook");

      return await createRecipePost(recipeInfo);
    },
    onSuccess: () => {
      console.log("succes createrecip");
    },
  });
};

export const useGetUsersRecipePost = () => {
  return useQuery({
    queryKey: ["usersRecipe"],
    queryFn: async () => {
      console.log("Fetching user's recipe");
      const data = await getUsersRecipe();
      console.log(data, "Fetched data");
      return data;
    },
  });
};

export const useIncreasUpvote = () => {
  return useMutation({
    mutationKey: ["increaseliked"],
    mutationFn: async ({
      recipeId,
      type,
    }: {
      recipeId: string;
      type: string;
    }) => {
      return await increaseUpvote(recipeId, type);
    },
  });
};
