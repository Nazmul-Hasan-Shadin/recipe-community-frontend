"use client";
interface UpdateRecipeInput {
  id: string; // The recipe ID
  recipeInfo: FormData; // The FormData object containing recipe data
}

import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createRecipePost,
  getAllRecipe,
  getUsersRecipe,
  increaseUpvote,
  updateRecipePost,
} from "../services/ReceipServices";

export const useGetAllRecipe = (
  searchTerm: string,
  page: number,
  limit: number
) => {
  console.log(searchTerm, "inside hook");

  return useQuery({
    queryKey: ["allrecipe"],
    queryFn: async () => await getAllRecipe(searchTerm, page, limit),
  });
};

export const useCreateRecipe = (): UseMutationResult<
  any,
  Error,
  FormData,
  unknown
> => {
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

export const useUpdateRecipe = () => {
  return useMutation<void, unknown, UpdateRecipeInput>({
    mutationKey: ["updateRecipe"],
    mutationFn: async ({ id, recipeInfo }) => {
      console.log(`Updating recipe with ID: ${id}`, recipeInfo);
      return await updateRecipePost(id, recipeInfo);
    },
    onSuccess: () => {
      console.log("Successfully updated recipe");
    },
    onError: (error) => {
      console.error("Error updating recipe:", error);
    },
  });
};
