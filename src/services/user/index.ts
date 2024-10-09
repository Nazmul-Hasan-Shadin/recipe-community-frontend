"use server";
import axiosInstance from "@/src/lib/axiosInstance";
export const findUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`user/${userId}`);


    return response.data.data; 
  } catch (error) {
    console.error("Error fetching user", error);
    throw error; 
};
