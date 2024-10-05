"use server";
import axiosInstance from "@/src/lib/axiosInstance";

export const findUserById = async (userId: string) => {
  const result = await axiosInstance.get(`/user/${userId}`);
  return result;
};
