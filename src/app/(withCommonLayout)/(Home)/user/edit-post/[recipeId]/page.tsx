"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useUpdateRecipe } from "@/src/hooks/recipes.hooks";

const UpdateRecipeForm = () => {
  const { recipeId } = useParams() as { recipeId: string }; // Explicitly cast recipeId as string
  const { mutate: handleUpdateRecipePost } = useUpdateRecipe();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [cookingTime, setCookingTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  // Fetch recipe data when the component mounts
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(
          `https://recipe-sharing-community.vercel.app/api/v1/recipe/${recipeId}`
        );
        const data = await response.json();

        setTitle(data.data.title);
        setIngredients(data.data.ingredients);
        setCookingTime(data.data.cookingTime);
        setInstructions(data.data.instructions);
        setImagePreviewUrls(data.data.images || []);
      } catch (error) {}
    };

    fetchRecipeData();
  }, [recipeId]);

  // Define the fields for ingredients
  type IngredientField = "name" | "quantity";

  const handleIngredientChange = (
    index: number,
    field: IngredientField, // Use the new type here
    value: string
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value; // This now works as expected
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...fileArray]);

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrls((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Prepare the recipe data object
    const recipeData = {
      title,
      ingredients,
      cookingTime,
      instructions,
    };

    formData.append("data", JSON.stringify(recipeData));

    // Add the image files to the FormData object
    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

    // Use the mutation function to send the request
    handleUpdateRecipePost({ id: recipeId, recipeInfo: formData });
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Update Recipe</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border rounded-lg p-4 shadow-sm bg-white">
          {/* Title Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 border rounded-lg"
              maxLength={300}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Ingredients Input */}
          <div className="mb-4">
            <h3 className="font-semibold">Ingredients</h3>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="w-1/2 p-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  className="w-1/2 p-2 border rounded-lg"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="text-blue-500"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Cooking Time Input */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Cooking Time (in minutes)"
              className="w-full p-3 border rounded-lg"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              required
            />
          </div>

          {/* Instructions Textarea */}
          <div className="mb-4">
            <textarea
              placeholder="Instructions"
              className="w-full p-3 border rounded-lg"
              rows={8}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg"
            />
            <div className="flex gap-4 mt-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index}>
                  <Image
                    width={90}
                    height={90}
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="py-2 px-6 bg-blue-500 text-black rounded-md"
            >
              Update Recipe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipeForm;
