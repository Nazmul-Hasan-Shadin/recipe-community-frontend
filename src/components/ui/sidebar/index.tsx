"use client";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { useGetSingleUser } from "@/src/hooks/auth.user";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdLiveTv } from "react-icons/md";
import { TbWorldCheck } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { SiBuzzfeed } from "react-icons/si";
import { RiHotelFill } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
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
        className={`bg-white mt-16 shadow-lg p-4 fixed top-0 left-0 overflow-y-auto  z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        {/* Profile Section */}
        <div className="text-center border-b pb-4">
          <Image
            src={user?.profilePicture as string}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
          <h2 className="text-lg font-bold mt-2">
            {user?.name || "User Name"}
          </h2>
          <p className="text-gray-600 text-sm">
            {fullUser?.bio || "Write here your bio"}
          </p>
        </div>

        {/* New Feeds Section */}
        <div className="mt-4">
          <h3 className="text-gray-800 font-bold mb-2">New Feeds</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                <MdLiveTv />
              </div>
              Newsfeed
            </li>
            <li className="flex items-center">
              <div className="bg-orange-500 text-white p-2 rounded-full mr-3">
                <TbWorldCheck />
              </div>
              Badges
            </li>
            <li className="flex items-center">
              <div className="bg-yellow-500 text-white p-2 rounded-full mr-3">
                <SiBuzzfeed />
              </div>
              Explore Stories
            </li>
            <li className="flex items-center">
              <div className="bg-red-500 text-white p-2 rounded-full mr-3">
                ⚡
              </div>
              Popular Groups
            </li>
            <li className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                <ImProfile />
              </div>
              Author Profile
            </li>
          </ul>
        </div>

        {/* More Pages Section */}
        <div className="mt-6">
          <h3 className="text-gray-800 font-bold mb-2">More Pages</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                <FaChartBar />
              </div>
              <div className="flex justify-between w-full">
                Email Box
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  584
                </span>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                <RiHotelFill />
              </div>
              Near Hotel
            </li>
            <li className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                🎉
              </div>
              Latest Event
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
