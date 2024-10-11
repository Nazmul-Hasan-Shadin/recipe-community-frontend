"use client";
interface UpdateRecipeInput {
  id: string; // The recipe ID
  recipeInfo: FormData; // The FormData object containing recipe data
}

import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createRecipePost,
  deleteRecipe,
  getAllRecipe,
  getUsersRecipe,
  increaseUpvote,
  rateRecipe,
  togglePublishRecipe,
  updateRecipePost,
} from "../services/ReceipServices";
import { toast } from "sonner";

interface RateRecipeInput {
  recipeId: string;
  rating: number;
  userId:string
}
export const useGetAllRecipe = (
  searchTerm?: string,
  page?: number,
  limit?: number
) => {
  console.log(searchTerm, "inside hook");

  return useQuery({
    queryKey: ["getAllRecipes"],
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
      toast.success("Your Recipe has Sumbitted ");
      console.log("succes createrecip");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong ");
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

export const useDeleteRecipe = () => {
  return useMutation({
    mutationKey: ["deleteRecipe"],
    mutationFn: async ({
      id,
      isDeleted,
    }: {
      id: string;
      isDeleted: boolean;
    }) => {
      console.log(`Deleting recipe with ID: ${id}, isDeleted: ${isDeleted}`);
      return await deleteRecipe(id, isDeleted);
    },
    onSuccess: () => {
      toast.success("Recipe deletion successful");
      console.log("Successfully updated recipe");
    },
    onError: (error) => {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe");
    },
  });
};

export const useTogglePublishRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["togglePublishRecipe"],
    mutationFn: async ({ id, action }: { id: string; action: string }) => {
      console.log(`Toggling recipe with ID: ${id} to ${action}`);
      return await togglePublishRecipe(id, action);
    },
    onSuccess: () => {
      toast.success("Recipe status updated successfully!");
      // Correct usage of invalidateQueries
      queryClient.invalidateQueries({ queryKey: ["getAllRecipes"] });
      console.log("Recipe publish/unpublish successful");
    },
    onError: (error) => {
      toast.error("Error updating recipe status");
      console.error("Error updating recipe status:", error);
    },
  });
};

export const useRateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["rateRecipe"],
    mutationFn: async ({ recipeId,userId, rating }: RateRecipeInput) => {
      console.log(`Rating recipe with ID: ${recipeId} with rating: ${rating}`);
      return await rateRecipe(recipeId, userId, rating);
    },
    onSuccess: () => {
      toast.success("Recipe rated successfully!");
      // Invalidate recipes query to update the rating
      queryClient.invalidateQueries({ queryKey: ["getAllRecipes"] });
      console.log("Successfully rated recipe");
    },
    onError: (error) => {
      console.error("Error rating recipe:", error);
      toast.error(error.message || "Error rating recipe");
    },
  });
};
