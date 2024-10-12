import { useMutation, useQuery } from "@tanstack/react-query";
import { followUser, getFollowStatus } from "../services/Follows";
import { toast } from "sonner";

export const useFollowUser = () => {
  return useMutation({
    mutationKey: ["followUser"],
    mutationFn: async (targetUserId: string) => {

      return await followUser(targetUserId);
    },
    onSuccess: () => {
      toast.success("Followed successful");
    },
    onError: (error) => {
      toast.success(error.message || "something went worng");
    },
  });
};

export const useGetFollowStatus = (targetUserId: string) => {
  return useQuery({
    queryKey: ["followUser"],
    queryFn: async () => {
      return await getFollowStatus(targetUserId);
    },
  });
};
