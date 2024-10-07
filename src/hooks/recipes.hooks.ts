"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRecipePost,
  getAllRecipe,
  getUsersRecipe,
  increaseUpvote,
} from "../services/ReceipServices";

export const useGetAllRecipe = (searchTerm, page, limit) => {
  console.log(searchTerm, "inside hook");

  return useQuery({
    queryKey: ["allrecipe"],
    queryFn: async () => await getAllRecipe(searchTerm, page, limit),
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
