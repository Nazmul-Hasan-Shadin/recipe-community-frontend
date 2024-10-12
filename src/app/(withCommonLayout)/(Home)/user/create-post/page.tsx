"use client";

import React, { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useCreateRecipe } from "@/src/hooks/recipes.hooks";
import { marked } from "marked";

// Dynamically load the MdEditor component
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
}) as React.FC<any>;

const CreatePost = () => {
  const { mutate: handleCreateRecipe } = useCreateRecipe();
  const [title, setTitle] = useState<string>("");
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: string }[]
  >([{ name: "", quantity: "" }]);
  const [cookingTime, setCookingTime] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleEditorChange = ({ text }: { text: string }) => {
    setBody(text);
  };

  const handleIngredientChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      imageFiles.forEach((file) => {
        formData.append(`image`, file);
      });

      // Convert Markdown body to HTML
      const htmlBody = marked(body);

      const data = {
        title,
        ingredients,
        instructions: htmlBody, // Use the HTML version of the body
        cookingTime: parseInt(cookingTime),
      };
      formData.append("data", JSON.stringify(data));

      handleCreateRecipe(formData);
    } catch (error) {
    }
  };

  return (
    <div style={{ marginLeft: "300px" }} className=" mx-auto  mt-10 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Create Recipe</h1>
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
            <div className="text-sm text-gray-500">{title.length}/300</div>
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

          {/* Body Input */}
          <div className="mb-4">
            <MdEditor
              value={body}
              style={{ height: "300px" }}
              renderHTML={(text: string) => (
                <ReactMarkdown>{text}</ReactMarkdown>
              )}
              onChange={handleEditorChange}
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

          {/* Save Draft and Post Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" className="py-2 px-6 bg-gray-300 rounded-md">
              Save Draft
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-blue-500 text-white rounded-md"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
