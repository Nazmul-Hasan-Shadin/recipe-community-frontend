"use client";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { useGetSingleUser } from "@/src/hooks/auth.user";
import Image from "next/image";

const Sidebar = () => {
  const { user } = useUser();
  const { data: fullUser } = useGetSingleUser(user?.userId as string);

  // State to toggle sidebar visibility on small devices
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Sidebar toggle button for small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`bg-white mt-16 shadow-lg p-4 fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        {/* Profile Section */}
        <div className="text-center">
          <Image
            src={user?.profilePicture as string}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
          <h2 className="text-lg font-bold mt-2">Nazmul Hasan Shadin</h2>
          <p className="text-gray-600 text-sm">
            {fullUser?.bio || "Write here your bio"}
          </p>
        </div>

        {/* Profile viewers */}
        <div className="mt-4">
          <p className="text-gray-500 text-sm">Profile viewers</p>
          <p className="font-semibold text-primary">
            {fullUser?.followers.length}
          </p>
          <p className="text-primary cursor-pointer">View all analytics</p>
        </div>

        {/* Premium section */}
        <div className="mt-4 border-t pt-4">
          <p className="text-sm text-gray-600">Network smarter with Premium</p>
          {fullUser?.isPremium ? (
            <p className="text-primary font-semibold">
              You are a Premium user. Explore the world!
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
              All things JavaScript: JS, TypeScript...
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
              All things JavaScript: JS, TypeScript, NodeJS, React, Angular...
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
