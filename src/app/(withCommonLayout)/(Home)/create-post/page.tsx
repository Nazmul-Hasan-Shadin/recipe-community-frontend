"use client"; // Required for interactive components in Next.js 13+

import React, { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import axiosInstance from "@/src/lib/axiosInstance";
import { useCreateRecipe } from "@/src/hooks/recipes.hooks";

// Dynamic import for markdown editor to avoid SSR issues
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const CreatePost = () => {
  const { mutate: handleCreateRecipe } = useCreateRecipe();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleEditorChange = ({ text }) => {
    setBody(text);
  };

  const handleImaeChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      imageFiles.forEach((file, index) => {
        formData.append(`image`, file);
      });

      const data = {
        title,
        instructions: body,
      };
      formData.append("data", JSON.stringify(data));

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      handleCreateRecipe(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Create post</h1>
      </div>
      <form>
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

          {/* Body Input */}
          <div className="mb-4">
            <MdEditor
              value={body}
              style={{ height: "300px" }}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
              onChange={handleEditorChange}
            />
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImaeChange}
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
            <button className="py-2 px-6 bg-gray-300 rounded-md">
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
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
