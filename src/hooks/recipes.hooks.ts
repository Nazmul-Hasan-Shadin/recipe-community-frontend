import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRecipePost,
  getAllRecipe,
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
