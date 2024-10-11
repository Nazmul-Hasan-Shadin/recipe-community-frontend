import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllComment,
  getSingleUser,
  makeComment,
} from "../services/Comments";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetUserWhoDoComment = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getSingleUser(userId),
  });
};

export const useMakeComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["comment"],
    mutationFn: async ({ recipeId, content }) => {
      return await makeComment(recipeId, content);
    },
    onSuccess: (_, variables) => {
      const { recipeId } = variables; // Destructure recipeId from variables
      // Invalidate and refetch the comments for the specific recipe
      queryClient.invalidateQueries({
        queryKey: ["getallcomment", recipeId],
      });
    },
  });
};
// export const useGetAllComment = () => {
//   return useQuery<any, Error, FieldValues>({
//     queryKey: ["getallcomment"],
//     queryFn: async (recipeId) => {
//       return await getAllComment(recipeId);
//     },
//   });
// };

export const useGetAllComment = (recipeId: string) => {
  return useQuery<any, Error>({
    queryKey: ["getallcomment", recipeId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Extracting recipeId from queryKey
      return await getAllComment(id as string);
    },
  });
};
