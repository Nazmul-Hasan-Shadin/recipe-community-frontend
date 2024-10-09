"use server";
import axiosInstance from "@/src/lib/axiosInstance";
export const findUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`user/${userId}`);

    console.log(response.data, "iam bani"); // Log the actual data

    return response.data.data; // Return the data field that contains the user information
  } catch (error) {
    console.error("Error fetching user", error);
    throw error; // Make sure to propagate the error in case of failure
  }
};
