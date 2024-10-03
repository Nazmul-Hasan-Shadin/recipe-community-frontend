"use client";
import { Recipe } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import React from "react";
import { AiFillLike, AiOutlineShareAlt, AiFillMessage } from "react-icons/ai";

const Card = ({ recipe }: { recipe: Recipe }) => {
  const { instructions, image, upvotes, downvotes, cookingTime, author, name } =
    recipe;
  return (
    <div className="max-w-xl mx-auto my-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2 ">
          {image ? (
            <Image
              alt="user profile picture"
              width={30}
              className="rounded-full"
              height={30}
              src={image}
            />
          ) : (
            <Avatar name="user" />
          )}
          <p className="text-lg font-bold text-gray-800">
            {" "}
            {name ? name : "shaidn"}{" "}
          </p>
          <p className="text-sm text-gray-500">17 hr. ago</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-blue-500 text-[11px] text-white px-2 py-1 rounded-md ">
            Join
          </button>
          <p>...</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-sm  text-gray-800 mb-2">
          {instructions ? instructions : ""}
        </p>
        {/* {image ? (
          <Image
            width={500}
            height={600}
            className="object-cover rounded-lg"
            src={image} // Replace with your image path
            alt="recipe post image"
          />
        ) : undefined} */}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <AiFillLike size={24} className="text-gray-500" />
            <span className="ml-1 text-gray-700">
              {" "}
              {upvotes ? upvotes.length : 0}{" "}
            </span>
          </div>
          <div className="flex items-center">
            <AiFillMessage size={24} className="text-gray-500" />
            <span className="ml-1 text-gray-700">
              {downvotes ? downvotes.length : 0}
            </span>
          </div>
          <div className="flex items-center">
            <AiOutlineShareAlt size={24} className="text-gray-500" />
          </div>
        </div>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
          Share
        </button>
      </div>
    </div>
  );
};

export default Card;
