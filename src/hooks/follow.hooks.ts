import { useMutation, useQuery } from "@tanstack/react-query";
import { followUser, getFollowStatus } from "../services/Follows";

export const useFollowUser = () => {
  return useMutation({
    mutationKey: ["followUser"],
    mutationFn: async (targetUserId: string) => {
      console.log(targetUserId, "inside hook follow user");

      return await followUser(targetUserId);
    },
    onSuccess: () => {
      console.log("succes createrecip");
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
