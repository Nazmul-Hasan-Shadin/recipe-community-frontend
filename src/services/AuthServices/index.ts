"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { user } from "@nextui-org/theme";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  console.log(userData, "iam user data from server");

  const res = await axiosInstance.post("user/register", userData);

  // cookies().set('accessToken',res.data.accessToken)
  console.log(res);

  console.log(res, "iamr res");
};

export const loginUser = async (userData: FieldValues) => {
  console.log(userData, "iam user data from server");

  const res = await axiosInstance.post("user/login", userData);

  cookies().set("accessToken", res.data.data.accessToken);
  console.log(res);

  console.log(res, "iamr res");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken;
  if (accessToken) {
    decodedToken = jwtDecode(accessToken);

    return {
      name: decodedToken.username,
      role: decodedToken.role,
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
  }

  console.log(decodedToken);

  return decodedToken;
};
