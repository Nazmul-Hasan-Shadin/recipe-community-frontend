import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllRecipe, increaseUpvote } from "../services/ReceipServices";

export const useGetAllRecipe = () => {
  return useQuery({
    queryKey: ["allrecipe"],
    queryFn: async (userData) => await getAllRecipe(),
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
