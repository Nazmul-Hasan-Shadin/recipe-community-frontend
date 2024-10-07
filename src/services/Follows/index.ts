"use server";

import axiosInstance from "@/src/lib/axiosInstance";

// target user id is  a user
export const followUser = async (targetUserId: string) => {
  console.log(targetUserId, "iam inside services", targetUserId);

  try {
    const response = await axiosInstance.post(`user/${targetUserId}/follow`, {
      targetUserId,
    });
    console.log(response, "recope post");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowStatus = async (targetUserId: string) => {
  console.log(targetUserId, "inside getfolls status target");

  try {
    const response = await axiosInstance.get(
      `user/${targetUserId}/following-status`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
