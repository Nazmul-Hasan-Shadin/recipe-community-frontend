"use client"; // Use client directive to allow state and context
import Card from "@/src/components/ui/card";
import { useEffect, useState, useContext } from "react";
// Import user context
import { Recipe } from "@/types";
import { userContext } from "@/src/context/user.provider";

export default function Home() {
  const { searchResults } = useContext(userContext); // Get search results from the context
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  console.log(searchResults, "from hiome");

  useEffect(() => {
    // If there are no search results, fetch the default recipe list
    const fetchDefaultRecipes = async () => {
      if (searchResults.length === 0) {
        const recipePost = await fetch("http://localhost:5001/api/v1/recipe", {
          cache: "no-store",
        });
        const res = await recipePost.json();
        setRecipes(res?.data || []);
      }
    };

    fetchDefaultRecipes();
  }, [searchResults]);

  // Use search results if available; otherwise, use default recipes
  const recipesToDisplay = searchResults.length > 0 ? searchResults : recipes;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {recipesToDisplay.map((recipe: Recipe) => (
        <Card key={recipe._id} recipe={recipe} />
      ))}
      {recipesToDisplay.length === 0 && <h2>No recipes found</h2>}
    </section>
  );
}
