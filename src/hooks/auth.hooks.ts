"use client";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPasswordByEmail,
} from "../services/AuthServices";
import { toast } from "sonner";

export const useRegisterUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["createuser"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: (error) => {
      toast.error(error.message || "somehting went wrong");
    },
  });
};

export const useLogoutUser = async () => {
  logoutUser();
};

export const useLoginUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["createuser"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (succ) => {
      console.log(succ);

      toast.success("Logged In succesfull");
    },
    onError: (error: any) => {
      console.log(error.message);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["changepassword"],
    mutationFn: async ({ oldPassword, newPassword }) => {
      return await changePassword(oldPassword, newPassword);
    },
    onSuccess: () => {
      toast.success("password reset  successful");
    },
    onError: (error) => {
      toast.error(  error.message ||"something went wrong");
    },
  });
};

export const useResetPasswordByEmail = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (email: string) => {
      return await resetPasswordByEmail(email);
    },
    onSuccess: () => {
      toast.success("password reset Link  successful");
    },
    onError: (error) => {
      toast.error(error.message || "something went wrong");
    },
  });
};
