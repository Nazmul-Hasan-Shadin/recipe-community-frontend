"use server";
import Card from "@/src/components/ui/card";
import axiosInstance from "@/src/lib/axiosInstance";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import React from "react";

const UserProfile = async () => {
  const usersProfilePost = await axiosInstance.get("recipe/my-profile");

  return (
    <div className="text-black">
      <div className="flex  justify-between border-b-gray-700  border-b">
        <div className="flex gap-3 items-center">
          <Image
            alt="profile image"
            width={70}
            height={70}
            className="rounded-full"
            src={
              "https://avatars.githubusercontent.com/u/111014373?s=400&u=ba39b33fa6e1dae3e5e46cb00eb9c986b03a1439&v=4"
            }
          />

          <div className="">
            <h2 className="font-semibold">Anik Ahmed Khan</h2>
            <span className="text-sm">400 followes</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button style={{ backgroundColor: "#D93900", color: "white" }}>
            Add to story
          </Button>
          <Button>Edit Profile</Button>
        </div>
      </div>

      {/* My Recipes Section */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 mb-8">
        {usersProfilePost?.data?.data.map((data) => (
          <Card key={data._id} recipe={data} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
