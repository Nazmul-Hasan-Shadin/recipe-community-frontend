"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axiosInstance from "@/src/lib/axiosInstance";
import axios from "axios";

const UserProfileEdit = () => {
  const [name, setName] = useState("Anik Ahmed Khan");
  const [bio, setBio] = useState(
    "Software Engineer passionate about food and coding."
  );
  const [profileImage, setProfileImage] = useState(
    "https://avatars.githubusercontent.com/u/111014373?s=400&u=ba39b33fa6e1dae3e5e46cb00eb9c986b03a1439&v=4"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Function to handle image file selection and preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (imageFile) formData.append("profileImage", imageFile);
      formData.append("name", name);
      formData.append("bio", bio);

      // API call to update user profile
      await axios.put("/user/update-profile", formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Profile Image Section */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-full object-cover"
            src={profileImage}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="ml-4"
          />
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            fullWidth
          />
        </div>

        {/* Bio Input using a normal textarea */}
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us a bit about yourself"
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:border-blue-300"
            rows={4}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            color="primary"
            style={{ backgroundColor: "#D93900" }}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;
