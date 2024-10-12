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
  deleteRecipeByUser,
  getAllRecipe,
  getAllRecipeForuser,
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
  userId: string;
}
export const useGetAllRecipe = (
  searchTerm?: string,
  page?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ["getAllRecipes"],
    queryFn: async () => await getAllRecipe(searchTerm, page, limit),
  });
};

export const useGetAllRecipeForUser = (
  searchTerm?: string,
  page?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ["getAllRecipes"],
    queryFn: async () => await getAllRecipeForuser(searchTerm, page, limit),
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
      return await createRecipePost(recipeInfo);
    },
    onSuccess: () => {
      toast.success("Your Recipe has Sumbitted ");
    },
    onError: (error) => {
      toast.success("Your Recipe has Sumbitted ");
    },
  });
};

export const useGetUsersRecipePost = () => {
  return useQuery({
    queryKey: ["usersRecipe"],
    queryFn: async () => {
      const data = await getUsersRecipe();
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
      return await updateRecipePost(id, recipeInfo);
    },
    onSuccess: () => {
      toast.success("recipe udpated succesful");
    },
    onError: (error) => {
      toast.success("recipe udpated succesful");
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
      return await deleteRecipe(id, isDeleted);
    },
    onSuccess: () => {
      toast.success("Recipe deletion successful");
    },
    onError: (error) => {
      toast.success("Recipe deletion successful");
    },
  });
};

export const useTogglePublishRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["togglePublishRecipe"],
    mutationFn: async ({ id, action }: { id: string; action: string }) => {
      return await togglePublishRecipe(id, action);
    },
    onSuccess: () => {
      toast.success("Recipe status updated successfully!");
      // Correct usage of invalidateQueries
      queryClient.invalidateQueries({ queryKey: ["getAllRecipes"] });
    },
    onError: (error) => {
      toast.error("Error updating recipe status");
    },
  });
};

export const useRateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["rateRecipe"],
    mutationFn: async ({ recipeId, userId, rating }: RateRecipeInput) => {
      return await rateRecipe(recipeId, userId, rating);
    },
    onSuccess: () => {
      toast.success("Recipe rated successfully!");
      // Invalidate recipes query to update the rating
      queryClient.invalidateQueries({ queryKey: ["getAllRecipes"] });
    },
    onError: (error) => {
      toast.error(error.message || "Error rating recipe");
    },
  });
};

export const useDeleteRecipeByuser = () => {
  return useMutation({
    mutationKey: ["deleteRecipeByUser"],
    mutationFn: async (id: string) => {
      return await deleteRecipeByUser(id);
    },
    onSuccess: () => {
      toast.success("Recipe deletion successful");
    },
    onError: (error) => {
      toast.success("Recipe deletion successful");
    },
  });
};

// export const useGetSpecificUserRecipe = () => {
//   return useQuery({
//     queryKey: ["userSpecificRecipe"],
//     queryFn: async () => {
//       console.log("Fetching user's recipe");
//       const data = await getUsersRecipe();
//       console.log(data, "Fetched data");
//       return data;
//     },
//   });
// };
