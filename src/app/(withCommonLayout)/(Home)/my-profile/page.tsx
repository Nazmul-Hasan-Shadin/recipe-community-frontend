"use server";
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
      <div style={{ marginTop: "40px" }} className="text-black">
        {/* Profile Info Section */}
        <div className="flex justify-between items-center pb-6 border-b px-7 border-gray-200">
          {/* Left Side: Profile Picture and Info */}
          <div className="flex flex-col gap-4 ">
            <Image
              alt="profile image"
              width={80}
              height={80}
              className="rounded-full"
              src={
                "https://avatars.githubusercontent.com/u/111014373?s=400&u=ba39b33fa6e1dae3e5e46cb00eb9c986b03a1439&v=4"
              }
            />

            <div>
              <h2 className="font-semibold text-lg">Nazmul Hasan Shadin</h2>
              <p className="text-sm text-gray-500">
                114 followers • 94 connections
              </p>
              <p className="text-sm text-gray-400">Dhaka, Dhaka, Bangladesh</p>
              <a href="#" className="text-sm text-blue-500">
                Contact info
              </a>
            </div>
          </div>

          {/* Right Side: Edit Profile Button */}
          <div className="flex gap-3">
            <Button
              style={{ backgroundColor: "#FF4500", color: "white" }}
              className="font-semibold"
            >
              Open to
            </Button>
            <Button className="font-semibold">Add profile section</Button>
            <Button className="font-semibold">Enhance profile</Button>
          </div>
        </div>

        {/* My Recipes Section */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 mb-8">
          {recipes.length > 0 ? (
            recipes.map((data: Recipe) => <Card key={data._id} recipe={data} />)
          ) : (
            <p className="text-center col-span-full">No recipes found.</p>
          )}
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
