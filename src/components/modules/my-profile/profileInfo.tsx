import { useUser } from "@/src/context/user.provider";
import { useGetSingleUser } from "@/src/hooks/auth.user";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileInfo = () => {
  const { user } = useUser();

  const { data: currentUser } = useGetSingleUser(user?.userId as string);

  return (
    <div className="flex justify-between items-center  pb-6 border-b px-7 border-gray-200">
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
              {currentUser?.followers.length || 0} followers •{" "}
              {currentUser?.following.length || 0} following
            </p>
            <p className="text-sm text-gray-400">Dhaka, Dhaka, Bangladesh</p>
            <a href="#" className="text-sm text-blue-500">
              Contact info
            </a>
          </div>
        </div>
      </div>
      <div className="">
        <Link href={`/user/update-profile`}>
          {" "}
          <Button
            style={{ backgroundColor: "#ff6a33", color: "white" }}
            className="font-semibold "
          >
            update profile
          </Button>
        </Link>
      </div>

      {/* Right Side: Edit Profile Button */}
    </div>
  );
};

export default ProfileInfo;
