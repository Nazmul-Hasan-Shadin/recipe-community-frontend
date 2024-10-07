"use server";

import { AddComment } from "@/src/components/modules/commentspage/AddComment";
import UserComments from "@/src/components/modules/commentspage/UserComments";
import Card from "@/src/components/ui/card";
import { useGetAllComment } from "@/src/hooks/comments.hooks";
import { all } from "axios";

const CommentsPage = async ({ params }) => {
  const { recipeId } = params;

  // Fetch the recipe post details
  const postResponse = await fetch(
    `http://localhost:5001/api/v1/recipe/${recipeId}`
  );
  const postData = await postResponse.json();
  const post = postData.data;

  // Fetch the comments for the recipe
  const commentsResponse = await fetch(
    `http://localhost:5001/api/v1/recipe/${recipeId}/comments`,
    {
      cache: "no-store",
    }
  );
  const commentsData = await commentsResponse.json();

  // const { data: allComments } = useGetAllComment(recipeId);

  const allcomments = commentsData;
  console.log(allcomments, "motherfuclk");

  return (
    <div className=" w-[760px] mt-10 p-6">
      {/* Recipe Card */}
      <Card recipe={post} />

      {/* Comment Input Section */}
      <div className="mt-6 p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        <AddComment recipeId={recipeId} />

        {/* Existing Comments */}

        {allcomments?.data.map((comment) => (
          <UserComments key={comment._id} comment={comment} /> // Pass each comment to the Comment component
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
