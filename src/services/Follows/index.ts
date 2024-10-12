"use server";

import axiosInstance from "@/src/lib/axiosInstance";

// target user id is  a user
export const followUser = async (targetUserId: string) => {

  try {
    const response = await axiosInstance.post(`user/${targetUserId}/follow`, {
      targetUserId,
    });
    return response;
  } catch (error) {
    
    
  }
};

export const getFollowStatus = async (targetUserId: string) => {

  try {
    const response = await axiosInstance.get(
      `user/${targetUserId}/following-status`
    );

    return response.data.data;
  } catch (error) {
  }
};
