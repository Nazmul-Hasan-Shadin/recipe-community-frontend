"use client";
import {
  useGetAllComment,
  useGetUserWhoDoComment,
} from "@/src/hooks/comments.hooks";
import { TUser } from "@/types";
import Image from "next/image";

const UserComments = ({
  comment,
}: {
  comment: {
    content: string;
    userId: TUser;
    recipeid: string;
    profilePicture: {};
    _id: string;
  };
}) => {
  console.log(comment, "iam comment");

  const { data: allComments } = useGetAllComment();
  console.log(allComments, "iam all comments");

  return (
    <div key={comment._id} className="border-b border-gray-300 py-4">
      <div className="flex items-center space-x-4">
        <Image
          src={
            comment?.userId?.profilePicture || "https://via.placeholder.com/40"
          }
          alt={"User avatar"}
          className="rounded-full"
          width={40}
          height={40}
        />
        <div className="bg-gray-50 p-2">
          <p className=""> {comment.userId.username} </p>
          <p className="text-gray-600 text-sm">{comment?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default UserComments;
