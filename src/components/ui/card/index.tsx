"use client";
import { useGetSingleUser } from "@/src/hooks/auth.user";
import { useIncreasUpvote } from "@/src/hooks/recipes.hooks";
import { Recipe } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillLike, AiOutlineShareAlt, AiFillMessage } from "react-icons/ai";

const Card = ({ recipe }: { recipe: Recipe }) => {
  const { mutate } = useIncreasUpvote();
  const {
    instructions,
    image,
    upvotes,
    downvotes,
    author,
    name,
    _id,
    profilePicture,
  } = recipe;

  const [likeCount, setLikeCount] = useState(upvotes?.length || 0);
  const [dislikeCount, setDislikeCount] = useState(downvotes?.length || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  // Updated handleVote function with type parameter
  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isLiked && voteType === "upvote") return; // Prevent duplicate upvoting
    if (isDisliked && voteType === "downvote") return; // Prevent duplicate downvoting

    try {
      await mutate(
        { recipeId: _id, type: voteType },
        {
          onSuccess: (response) => {
            // Update like and dislike counts based on response
            setLikeCount(response.data.upvoteCount);
            setDislikeCount(response.data.downvoteCount);

            if (voteType === "upvote") {
              setIsLiked(true);
              setIsDisliked(false);
            } else {
              setIsLiked(false);
              setIsDisliked(true);
            }
          },
          onError: (error) => {
            console.error("Error during voting:", error);
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error occurred:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          {image ? (
            <Image
              alt="user profile picture"
              width={30}
              height={30}
              className="rounded-full"
              src={author.profilePicture}
            />
          ) : (
            <Avatar name="user" />
          )}
          <p className="text-lg font-bold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">17 hr. ago</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-blue-500 text-[11px] text-white px-2 py-1 rounded-md">
            Join
          </button>
          <p>...</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-sm text-gray-800 mb-2">
          {instructions ? instructions : ""}
        </p>
      </div>

      <div>
        <Image src={image[0]} height={180} width={400} alt="recipe image" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center space-x-4">
          <div
            onClick={() => handleVote("upvote")}
            className="flex items-center cursor-pointer"
          >
            <AiFillLike size={24} className="text-gray-500" />
            <button className="ml-1 flex text-gray-700">{likeCount}</button>
          </div>
          <div
            onClick={() => handleVote("downvote")}
            className="flex items-center cursor-pointer"
          >
            <AiFillMessage size={24} className="text-gray-500" />
            <button className="ml-1 flex text-gray-700">{dislikeCount}</button>
          </div>
          <div className="flex items-center">
            <AiOutlineShareAlt size={24} className="text-gray-500" />
            <Link href={`/comments/${_id}`}>share</Link>
          </div>
        </div>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
          share
        </button>
      </div>
    </div>
  );
};

export default Card;
