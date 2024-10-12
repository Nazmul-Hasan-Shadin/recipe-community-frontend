"use server";
import axiosInstance from "@/src/lib/axiosInstance";
import { Iuser } from "@/types";
import { user } from "@nextui-org/theme";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
interface DecodedToken extends JwtPayload {
  username: string;
  role: string;
  email: string;
  userId: string;
  profilePicture: string;
}

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await axios.post(
      "https://recipe-sharing-community.vercel.app/api/v1/user/register",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";
    console.log(errorMessage);

    throw new Error(errorMessage);
  }

  // cookies().set('accessToken',res.data.accessToken)
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await axiosInstance.post("user/login", userData);

    console.log("iam res", res);

    cookies().set("accessToken", res.data.data.accessToken);
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";
    console.log(errorMessage);

    throw new Error(errorMessage);
  }
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

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const res = await axiosInstance.post("user/change-password", {
      oldPassword,
      newPassword,
    });

    return res;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";

    throw new Error(errorMessage);
  }
};

export const resetPasswordByEmail = async (email: string) => {
  try {
    const res = await axiosInstance.post("user/forget-password", { email });

    return res;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "An error occurred";

    throw new Error(errorMessage);
  }
};

export const logoutUser = async () => {
  cookies().set("accessToken", "");
};
