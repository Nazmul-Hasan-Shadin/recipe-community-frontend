"use server";

import { AddComment } from "@/src/components/modules/commentspage/AddComment";
import UserComments from "@/src/components/modules/commentspage/UserComments";
import Card from "@/src/components/ui/card";
import { Recipe } from "@/types";

interface CommentsPageProps {
  params: {
    recipeId: string;
  };
}

// interface Recipe {
//   _id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   // Add other relevant fields here if needed
// }

interface Comment {
  _id: string;
  content: string;
  author: string;
  profilePicture?: {};
  createdAt: string;
}

interface RecipeData {
  data: Recipe;
}

interface CommentsData {
  data: Comment[];
}

const CommentsPage = async ({ params }: CommentsPageProps) => {
  const { recipeId } = params;

  try {
    // Fetch the recipe post details
    const postResponse = await fetch(
      // `https://recipe-sharing-community.vercel.app/api/v1/recipe/${recipeId}`
      `http://localhost:5001/api/v1/recipe/${recipeId}`
    );

    if (!postResponse.ok) {
      throw new Error("Failed to fetch the recipe details");
    }

    const postData: RecipeData = await postResponse.json();
    const post = postData.data;

    // Fetch the comments for the recipe
    const commentsResponse = await fetch(
      // `https://recipe-sharing-community.vercel.app/api/v1/recipe/${recipeId}/comments`,
      `http://localhost:5001/api/v1/recipe/${recipeId}/comments`,
      {
        cache: "no-store",
      }
    );

    if (!commentsResponse.ok) {
      throw new Error("Failed to fetch comments");
    }

    const commentsData: CommentsData = await commentsResponse.json();
    const allcomments = commentsData;

    return (
      <div className="w-[760px] mt-10 p-6">
        {/* Recipe Card */}
        <Card recipe={post} />

        {/* Comment Input Section */}
        <div className="mt-6 p-4 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          <AddComment recipeId={recipeId} />

          {/* Existing Comments */}
          {allcomments?.data.map((comment) => (
            <UserComments key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipe or comments:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
};

export default CommentsPage;
