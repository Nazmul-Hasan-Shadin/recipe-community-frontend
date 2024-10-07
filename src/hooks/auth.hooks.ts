import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser, registerUser } from "../services/AuthServices";
import { toast } from "sonner";

export const useRegisterUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["createuser"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useLoginUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["createuser"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      console.log("user Logged in successful");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
