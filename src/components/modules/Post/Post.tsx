import Image from "next/image";
import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

const Post = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-lg p-4 border rounded-md shadow-sm bg-white">
      <div className="flex w-full items-center">
        <Image
          src="https://avatars.githubusercontent.com/u/111014373?s=400&u=ba39b33fa6e1dae3e5e46cb00eb9c986b03a1439&v=4"
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <input
          type="text"
          placeholder="What recipe do you want to post or share?"
          className="flex-1   w-full ml-4 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Buttons Section Below Input */}
      <div className="mt-4 flex flex-wrap justify-between gap-1 md:gap-4 w-full">
        <div className="flex gap-1 items-center">
          <MdEdit className="text-xl" />
          <span>Post</span>
        </div>
        <div className="flex gap-1 items-center">
          <FiEdit className="text-xl" />
          <span>Answer</span>
        </div>
        <div className="flex gap-1 items-center">
          <AiFillQuestionCircle className="text-xl" />
          <span>Question</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
