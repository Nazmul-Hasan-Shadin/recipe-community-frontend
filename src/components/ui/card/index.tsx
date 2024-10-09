"use client";
import { useUser } from "@/src/context/user.provider";
import { useFollowUser, useGetFollowStatus } from "@/src/hooks/follow.hooks";
import { useIncreasUpvote } from "@/src/hooks/recipes.hooks";
import { Recipe } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import { LinkIcon } from "@nextui-org/link";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiFillMessage } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";

const Card = ({ recipe }: { recipe: Recipe }) => {
  const { user } = useUser();
  const { mutate } = useIncreasUpvote();
  const { mutate: handleFollowUser } = useFollowUser();
  const {
    instructions,
    image,
    upvotes,
    downvotes,
    author,
    name,
    createdAt,
    cookingTime,
    ingredients,
    _id,
  } = recipe;

  const { data: followedStatus } = useGetFollowStatus(author._id);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    if (followedStatus?.isFollowing !== undefined) {
      setIsFollowing(followedStatus.isFollowing);
    }
  }, [followedStatus]);

  const [likeCount, setLikeCount] = useState(upvotes?.length || 0);
  const [dislikeCount, setDislikeCount] = useState(downvotes?.length || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isVoting) return;
    if (isLiked && voteType === "upvote") return;
    if (isDisliked && voteType === "downvote") return;

    if (voteType === "upvote") {
      setLikeCount((prevCount) => prevCount + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikeCount((prevCount) => prevCount - 1);
        setIsDisliked(false);
      }
    } else if (voteType === "downvote") {
      setDislikeCount((prevCount) => prevCount + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikeCount((prevCount) => prevCount - 1);
        setIsLiked(false);
      }
    }

    try {
      setIsVoting(true);
      await mutate(
        { recipeId: _id, type: voteType },
        {
          onSuccess: (response) => {
            setLikeCount(response.data.upvoteCount);
            setDislikeCount(response.data.downvoteCount);
          },
          onError: (error) => {
            console.error("Error during voting:", error);
            if (voteType === "upvote") {
              setLikeCount((prevCount) => prevCount - 1);
              setIsLiked(false);
            } else if (voteType === "downvote") {
              setDislikeCount((prevCount) => prevCount - 1);
              setIsDisliked(false);
            }
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error occurred:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleFollow = async () => {
    try {
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error during follow action:", error);
    }
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const authorId = author;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          {user?.profilePicture ? (
            <Image
              alt="user profile picture"
              width={40}
              height={40}
              className="rounded-full"
              src={user.profilePicture}
            />
          ) : (
            <Avatar name="user" />
          )}
          <div className="flex items-center">
            <div>
              <p className="text-sm font-semibold text-gray-800">{name}</p>
              <p className="text-[12px] text-gray-500">17 hr. ago</p>
            </div>
            <button
              className="text-primary ml-2"
              onClick={() => handleFollowUser(authorId)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
        <button
          onClick={toggleOptions}
          className="text-gray-500 hover:text-gray-800"
        >
          <FiMoreHorizontal size={24} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <h2 className="text-md mb-2">{instructions || ""}</h2>
        <p>
          <span className="font-semibold text-[12px]">
            Cooking time: {cookingTime}
          </span>
        </p>

        {/* Ingredients List */}
        <div className="mt-4">
          <h3 className="font-semibold text-[12px] mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm text-gray-700">
                {ingredient.name} - {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>

        {image && image[0] ? (
          <div className="relative w-full h-[300px] mt-4">
            <Image
              src={image[0]}
              alt="recipe image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center space-x-4">
          <div
            onClick={() => handleVote("upvote")}
            className="flex items-center cursor-pointer"
          >
            <AiFillLike
              size={24}
              className={isLiked ? "text-blue-500" : "text-gray-500"}
            />
            <span className="ml-1 text-gray-700">{likeCount}</span>
          </div>

          <div
            onClick={() => handleVote("downvote")}
            className="flex items-center cursor-pointer"
          >
            <AiFillDislike
              size={24}
              className={isDisliked ? "text-red-500" : "text-gray-500"}
            />
            <span className="ml-1 text-gray-700">{dislikeCount}</span>
          </div>

          <div className="flex items-center">
            <AiFillMessage size={24} className="text-gray-500" />
            <Link href={`/comments/${_id}`} className="ml-1 text-gray-700">
              Comments
            </Link>
          </div>
        </div>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-all">
          Share
        </button>
      </div>

      {/* Options Menu */}
      {showOptions && (
        <div className="absolute right-4 top-12 bg-white shadow-md rounded-md w-32">
          <Link href={`/edit-post/${_id}`}>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Edit
            </button>
          </Link>
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
