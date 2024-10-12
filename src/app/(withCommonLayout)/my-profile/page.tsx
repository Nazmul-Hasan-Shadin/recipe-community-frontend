"use client";
import ProfileInfo from "@/src/components/modules/my-profile/profileInfo"; // Ensure this export is correct
import Card from "@/src/components/ui/card"; // Ensure this export is correct
import { useGetUsersRecipePost } from "@/src/hooks/recipes.hooks"; // Your custom hook
import { Recipe } from "@/types";
import { Button } from "@nextui-org/button"; // Ensure this import is correct
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

const UserProfile = () => {
  const { data: usersRecipe = [], isLoading, error } = useGetUsersRecipePost();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load recipes. Please try again later.
      </p>
    );
  }

  // Filter and sort recipes based on user input
  const filteredRecipes = usersRecipe
    .filter((recipe: Recipe) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        recipe.title!.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.name.toLowerCase().includes(lowerCaseSearchTerm)
        ) ||
        recipe.cookingTime.toString().includes(lowerCaseSearchTerm)
      );
    })
    .sort((a: Recipe, b: Recipe) => {
      const aTitle = a.title!.toLowerCase();
      const bTitle = b.title!.toLowerCase();
      return sortOrder === "asc"
        ? aTitle.localeCompare(bTitle)
        : bTitle.localeCompare(aTitle);
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / limit);
  const displayedRecipes = filteredRecipes.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  // Pagination and search components
  return (
    <div className="flex justify-center border">
      <div className="text-black px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
        <ProfileInfo />
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-4">
          <Input
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow mr-2 mb-2 sm:mb-0 border"
          />
          <Button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="mb-2 sm:mb-0"
          >
            Sort by Name: {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>
        <div className="max-w-4xl mx-auto mt-8  flex flex-col justify-center gap-6 mb-8">
          {displayedRecipes.length > 0 ? (
            displayedRecipes.map((data: Recipe) => (
              <Card key={data._id} recipe={data} />
            ))
          ) : (
            <p className="text-center col-span-full">No recipes found.</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
