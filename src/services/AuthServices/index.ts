"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { Iuser } from "@/types";
import { user } from "@nextui-org/theme";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { FieldValues } from "react-hook-form";
interface DecodedToken extends JwtPayload {
  username: string;
  role: string;
  email: string;
  userId: string;
  profilePicture: string;
}

export const registerUser = async (userData: FieldValues) => {
  console.log(userData, "register dsatar");

  try {
    const res = await axios.post(
      // "https://recipe-sharing-community.vercel.app/api/v1/user/register",
      "  http://localhost:5001/api/v1/user/register",
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

export const getCurrentUser = async (): Promise<
  | Pick<Iuser, "name" | "email" | "role" | "userId" | "profilePicture">
  | undefined
> => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);

      return {
        name: decodedToken.username,
        role: decodedToken.role,
        email: decodedToken.email,
        userId: decodedToken.userId,
        profilePicture: decodedToken.profilePicture,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return undefined; // Return undefined if the token is invalid or missing
};

export const logoutUser = async () => {
  cookies().set("accessToken", "");
};
