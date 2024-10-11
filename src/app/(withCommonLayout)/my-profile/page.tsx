"use server";
import ProfileInfo from "@/src/components/modules/my-profile/profileInfo";
import Card from "@/src/components/ui/card";
import axiosInstance from "@/src/lib/axiosInstance";
import { Recipe } from "@/types";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import React from "react";

const UserProfile = async () => {
  try {
    const usersProfilePost = await axiosInstance.get("recipe/my-profile");
    console.log(usersProfilePost);

    // Handle the case where data might be undefined or empty
    const recipes = usersProfilePost?.data?.data || [];

    return (
      <div className="flex justify-center border">
        <div style={{ marginTop: "40px" }} className="text-black  ">
          {/* Profile Info Section */}

          <ProfileInfo />

          {/* My Recipes Section */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 mb-8">
            {recipes.length > 0 ? (
              recipes.map((data: Recipe) => (
                <Card key={data._id} recipe={data} />
              ))
            ) : (
              <p className="text-center col-span-full">No recipes found.</p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
    return (
      <p className="text-center">
        Failed to load profile data. Please try again later.
      </p>
    );
  }
};

export default UserProfile;
