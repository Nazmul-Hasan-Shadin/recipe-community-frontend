"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { user } from "@nextui-org/theme";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  console.log(userData, "register dsatar");

  try {
    const res = await axios.post(
      "http://localhost:5001/api/v1/user/register",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res, "iam res");

    return res.data;
  } catch (error) {
    console.log(error);
  }

  // cookies().set('accessToken',res.data.accessToken)
};

export const loginUser = async (userData: FieldValues) => {
  console.log(userData, "iam user data from server");

  const res = await axiosInstance.post("user/login", userData);

  cookies().set("accessToken", res.data.data.accessToken);
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

  return decodedToken;
};
