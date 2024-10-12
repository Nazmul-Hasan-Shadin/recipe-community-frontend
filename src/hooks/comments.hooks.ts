import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteComment,
  editComment,
  getAllComment,
  getSingleUser,
  makeComment,
} from "../services/Comments";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface EditCommentParams {
  commentId: string;
  content: string;
}

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
      const { recipeId } = variables;

      queryClient.invalidateQueries({
        queryKey: ["getallcomment", recipeId],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "somehting went wrong");
    },
  });
};


export const useGetAllComment = (recipeId: string) => {
  return useQuery<any, Error>({
    queryKey: ["getallcomment", recipeId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Extracting recipeId from queryKey
      return await getAllComment(id as string);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string): Promise<void> => {
      await deleteComment(commentId);
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["getallcomment"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};

export const useEditComment = (): UseMutationResult<
  unknown,
  Error,
  EditCommentParams
> => {
  return useMutation({
    mutationKey: ["editComment"],
    mutationFn: ({ commentId, content }: EditCommentParams) =>
      editComment({ commentId, content }),
    onSuccess: () => {
      toast.success("Comment updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update the comment.");
    },
  });
};
