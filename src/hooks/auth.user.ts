import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeUserStatus,
  deleteUser,
  findUserById,
  getAllUsers,
} from "../services/user";
import { Iuser } from "@/types";

export const useGetSingleUser = (userId: string) => {
  console.log(userId);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await findUserById(userId);
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
      });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await changeUserStatus({ id, status });
    },
    onSuccess: () => {
      // Invalidate the users list to refetch the updated status
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
      });
    },
    onError: (error) => {
      console.error("Error changing user status:", error);
      // You can handle the error here, like showing a toast notification
    },
  });
};
