"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { Iuser } from "@/types";

export const findUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`user/${userId}`);

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";

    throw new Error(errorMessage);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user`);

    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";

    throw new Error(errorMessage);
  }
};

export const changeUserStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<Iuser[]> => {
  try {
    const response = await axiosInstance.patch(`/user/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";

    throw new Error(errorMessage);
  }
};

export const updateUser = async (userData: FormData) => {
  try {
    const res = await axiosInstance.patch("user/update-profile", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";

    throw new Error(errorMessage);
  }

  // cookies().set('accessToken',res.data.accessToken)
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";

    throw new Error(errorMessage);
  }
};
