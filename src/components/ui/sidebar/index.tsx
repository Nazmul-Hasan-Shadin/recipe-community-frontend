"use client";
import { useUser } from "@/src/context/user.provider";
import { useGetSingleUser } from "@/src/hooks/auth.user";
import Image from "next/image";

const Sidebar = () => {
  const { user } = useUser();
  console.log(user, "iam userbro");
  const { data: fullUser } = useGetSingleUser(user?.userId as string);

  console.log(fullUser, "iam fulluser");

  return (
    <div className="bg-white shadow-lg p-4 w-64 h-screen fixed">
      {/* Profile Section */}
      <div className="text-center">
        <Image
          src={user?.profilePicture as string} // Replace this with the actual image path
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
        <h2 className="text-lg font-bold mt-2">Nazmul Hasan Shadin</h2>
        <p className="text-gray-600 text-sm">
          {fullUser?.bio || "Write here your bio "}
        </p>
      </div>

      {/* Profile viewers */}
      <div className="mt-4">
        <p className="text-gray-500 text-sm">Profile viewers</p>
        <p className="font-semibold text-primary">3</p>
        <p className="text-primary cursor-pointer">View all analytics</p>
      </div>

      {/* Premium section */}
      <div className="mt-4 border-t pt-4">
        <p className="text-sm text-gray-600">Network smarter with Premium</p>
        {fullUser?.isPremium ? (
          <p className="text-primary font-semibold">
            {" "}
            'You are Premium user . Explore world '
          </p>
        ) : (
          <button className="text-sm font-semibold text-primary mt-2">
            Try 1 month of Premium for BDTO
          </button>
        )}
      </div>

      {/* Saved items */}
      <div className="mt-4">
        <p className="font-bold text-gray-800">Saved items</p>
      </div>

      {/* Recent Section */}
      <div className="mt-4">
        <p className="text-gray-800 font-bold">Recent</p>
        <ul className="text-gray-600 text-sm space-y-2 mt-2">
          <li className="flex items-center">
            <i className="fas fa-book mr-2"></i>
            JavaScript
          </li>
          <li className="flex items-center">
            <i className="fas fa-book mr-2"></i>
            All things Javascript: JS, TypeScript...
          </li>
        </ul>
      </div>

      {/* Groups Section */}
      <div className="mt-4">
        <p className="text-gray-800 font-bold">Groups</p>
        <ul className="text-gray-600 text-sm space-y-2 mt-2">
          <li className="flex items-center">
            <i className="fas fa-users mr-2"></i>
            JavaScript
          </li>
          <li className="flex items-center">
            <i className="fas fa-users mr-2"></i>
            All things Javascript: JS, TypeScript, NodeJS, React, Angular...
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
