import {
  useDeleteRecipe,
  useGetAllRecipe,
  useTogglePublishRecipe,
} from "@/src/hooks/recipes.hooks";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

interface Recipe {
  id: string;
  title: string;
  name: string;
  image: string;
  isPublished: boolean;
  isDeleted: boolean;
}

const RecipeTable: React.FC = () => {
  const { data: allRecipePost, isLoading, error } = useGetAllRecipe();
  const [data, setData] = useState<Recipe[]>([]);
  const { mutate: handleDeleteRecipe } = useDeleteRecipe();
  const { mutate: handleTogglePublishRecipe } = useTogglePublishRecipe();

  useEffect(() => {
    if (allRecipePost && allRecipePost.data) {
      setData(
        allRecipePost.data
          .filter((recipe: any) => !recipe.isDeleted) // Only show non-deleted recipes
          .map((recipe: any) => ({
            id: recipe._id,
            title: recipe.title,
            name: recipe.name,
            image: recipe.image[0],
            isPublished: recipe.isPublished,
            isDeleted: recipe.isDeleted,
          }))
      );
    }
  }, [allRecipePost]);

  const handlePublishToggle = (id: string) => {
    const updatedRecipe = data.find((recipe) => recipe.id === id);
    if (updatedRecipe) {
      const action = updatedRecipe.isPublished ? "unpublish" : "publish";

      setData((prevData) =>
        prevData.map((recipe) =>
          recipe.id === id
            ? { ...recipe, isPublished: !updatedRecipe.isPublished }
            : recipe
        )
      );

      handleTogglePublishRecipe(
        { id, action },
        {
          onSuccess: () => {
            toast.success(`Recipe ${action}ed successfully!`);
          },
          onError: (error) => {
            // Revert state on error
            setData((prevData) =>
              prevData.map((recipe) =>
                recipe.id === id
                  ? { ...recipe, isPublished: updatedRecipe.isPublished }
                  : recipe
              )
            );
            toast.error(`Failed to ${action} recipe: ${error.message}`);
          },
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    const updatedRecipe = data.find((recipe) => recipe.id === id);
    if (updatedRecipe) {
      setData((prevData) =>
        prevData.map((recipe) =>
          recipe.id === id
            ? { ...recipe, isDeleted: true, isPublished: false }
            : recipe
        )
      );

      handleDeleteRecipe({ id, isDeleted: true });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error fetching recipes: {error.message}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Manage Recipes
      </h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-600">Image</th>
            <th className="p-3 text-left font-semibold text-gray-600">Title</th>
            <th className="p-3 text-left font-semibold text-gray-600">Author</th>
            <th className="p-3 text-center font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((recipe) => (
              <tr
                key={recipe.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{recipe.title}</td>
                <td className="p-3">{recipe.name}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className={`p-2 rounded ${
                        recipe.isPublished
                          ? "bg-gray-500"
                          : "bg-[rgb(255,106,51)]"
                      } text-white`}
                      onClick={() => handlePublishToggle(recipe.id)}
                    >
                      {recipe.isPublished ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      className="p-2 rounded bg-red-500 text-white"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500">
                No recipes available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
