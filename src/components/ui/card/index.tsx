"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { useFollowUser, useGetFollowStatus } from "@/src/hooks/follow.hooks";
import {
  useDeleteRecipeByuser,
  useIncreasUpvote,
  useRateRecipe,
} from "@/src/hooks/recipes.hooks";
import { Recipe } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import {
  AiFillLike,
  AiFillDislike,
  AiFillMessage,
  AiFillStar,
} from "react-icons/ai";

import { FiMoreHorizontal } from "react-icons/fi";
import { IoMdShareAlt } from "react-icons/io";
import Rating from "react-rating";
import { useParams } from "next/navigation"; // Use useParams for accessing params
import Link from "next/link";

const Card = ({
  recipe,
  onDelete,
}: {
  recipe: Recipe;
  onDelete?: (id: string) => void;
}) => {
  const { id } = useParams();
  const { user } = useUser();
  const { mutate: handleIncreasUpvote } = useIncreasUpvote();
  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleRateRecipe } = useRateRecipe();
  const {
    instructions = "",
    image,
    upvotes,
    downvotes,
    author,
    name,
    createdAt,
    cookingTime,
    ingredients,
    _id,
    ratings,
  } = recipe || {};

  const { mutate: handleDeleteRecipeByUser } = useDeleteRecipeByuser();

  const { data: followedStatus } = useGetFollowStatus(author?._id);
  const [isFollowing, setIsFollowing] = useState<boolean>(
    followedStatus?.isFollowing || false
  );

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
  const [showOptions, setShowOptions] = useState(false); // Manage options dropdown

  // Rating state
  const [userRating, setUserRating] = useState<number | null>(null);
  const averageRating =
    ratings?.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
      : 0;

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
      await handleIncreasUpvote(
        { recipeId: _id, type: voteType },
        {
          onSuccess: (response) => {
            setLikeCount(response.data.upvoteCount);
            setDislikeCount(response.data.downvoteCount);
          },
          onError: (error) => {
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
    } finally {
      setIsVoting(false);
    }
  };

  const handleFollow = async () => {
    try {
      const newFollowStatus = !isFollowing;
      await handleFollowUser(author?._id);
      setIsFollowing(newFollowStatus);
    } catch (error) {
    }
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  // Handle rating submission
  const handleRate = async (rating: number) => {
    if (!user) return;

    setUserRating(rating);

    try {
      await handleRateRecipe({
        recipeId: _id,
        userId: user._id as string,
        rating,
      });
    } catch (error) {
    }
  };

  const handleEdit = () => {
    window.location.href = `/user/edit-post/${_id}`;
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await handleDeleteRecipeByUser(_id);
        onDelete!(_id);
        alert("Recipe deleted successfully");
      } catch (error) {
      }
    }
  };

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
            <button className="text-primary ml-2" onClick={handleFollow}>
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
        {/* Dropdown Options */}
        {showOptions && (
          <div className="absolute right-4 bg-white shadow-lg rounded-lg mt-2">
            <button
              onClick={handleEdit}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h2 className="text-md mb-2">
          <div dangerouslySetInnerHTML={{ __html: instructions || "" }} />
        </h2>
        <p>
          <span className="font-semibold text-[12px]">
            Cooking time: {cookingTime}
          </span>
        </p>

        {/* Ingredients List */}
        <div className="mt-4">
          <h3 className="font-semibold text-[12px] mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredients?.map((ingredient, index) => (
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
            className={`flex items-center cursor-pointer ${
              isLiked ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <AiFillLike size={20} />
            <span className="ml-1">{likeCount}</span>
          </div>
          <div
            onClick={() => handleVote("downvote")}
            className={`flex items-center cursor-pointer ${
              isDisliked ? "text-red-600" : "text-gray-600"
            }`}
          >
            <AiFillDislike size={20} />
            <span className="ml-1">{dislikeCount}</span>
          </div>
          <div className="flex items-center cursor-pointer text-gray-600">
            <Link href={`/user/comments/${_id}`}>
              <AiFillMessage size={20} />
            </Link>
            <span className="ml-1">0</span>
          </div>
          <div className="flex items-center cursor-pointer text-gray-600">
            <IoMdShareAlt size={20} />
          </div>
        </div>
        {/* Rating Component */}
        <Rating
          emptySymbol={<AiFillStar className="text-gray-400" />}
          fullSymbol={<AiFillStar className="text-yellow-500" />}
          initialRating={userRating || averageRating}
          onChange={handleRate}
        />
      </div>
    </div>
  );
};

export default Card;
