"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { Iuser } from "@/types";

export const findUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`user/${userId}`);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get(`/user`);

  return response.data;
};

export const changeUserStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<Iuser[]> => {
  console.log(id, status, "iam inside chancge statuse");

  const response = await axiosInstance.patch(`/user/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
