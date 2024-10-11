import { Button } from "@nextui-org/button";
import Image from "next/image";
import React from "react";

const ProfileInfo = () => {
  return (
    <div className="flex justify-between  pb-6 border-b px-7 border-gray-200">
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

        <div className="flex justify-between w-full">
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

          <div className="flex gap-3">
            <Button className="font-semibold">Enhance profile</Button>
          </div>
        </div>
      </div>

      {/* Right Side: Edit Profile Button */}
    </div>
  );
};

export default ProfileInfo;
