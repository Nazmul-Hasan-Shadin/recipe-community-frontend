"use client"; // Use client directive to allow state and context

import Card from "@/src/components/ui/card";
import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { useUser } from "@/src/context/user.provider";
import Image from "next/image"; // Import Image for user profile picture
import Post from "@/src/components/modules/Post/Post";

export default function Home() {
  const { searchResults } = useUser();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      if (searchResults.length === 0) {
        const recipePost = await fetch(
         
          "https://recipe-sharing-community.vercel.app/api/v1/recipe/users-recipe",
          {
            cache: "no-store",
          }
        );
        const res = await recipePost.json();
        setRecipes(res?.data || []);
      }
    };

    fetchDefaultRecipes();
  }, [searchResults]);

  // Use search results if available; otherwise, use default recipes
  const recipesToDisplay = searchResults.length > 0 ? searchResults : recipes;

  return (
    <div className="w-full flex flex-col items-center gap-6 py-8 md:py-6">
      {/* Post Section */}
      <Post />
      {/* Recipes Display Section */}
      <section className="flex flex-col items-center  gap-4 py-4 w-full ">
        {recipesToDisplay.map((recipe: Recipe) => (
          <Card key={recipe._id} recipe={recipe} />
        ))}
        {recipesToDisplay.length === 0 && <h2>No recipes found</h2>}
      </section>
    </div>
  );
}
