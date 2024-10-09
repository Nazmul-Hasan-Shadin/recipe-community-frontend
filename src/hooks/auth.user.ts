import { useQuery } from "@tanstack/react-query";
import { findUserById } from "../services/user";

export const useGetSingleUser = (userId: string) => {
  console.log(userId);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await findUserById(userId);
    },
  });
};
