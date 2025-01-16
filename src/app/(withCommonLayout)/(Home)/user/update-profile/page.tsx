"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useChangePassword } from "@/src/hooks/auth.hooks";
import axios from "axios";
import { useGetSingleUser, useUpdateUser } from "@/src/hooks/auth.user";
import { useUser } from "@/src/context/user.provider";

const UserProfileEdit = () => {
  const { mutate: handleChangePassword } = useChangePassword();
  const { user } = useUser();
  const { data: mainUser } = useGetSingleUser(user?.userId as string);

  const [name, setName] = useState(""); // Initialize name state
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Password reset state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email reset state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const { mutate: handleUpdateUserProfile } = useUpdateUser();

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
      if (imageFile) formData.append("profilePicture", imageFile);

      const data = {
        name,
        bio,
      };

      formData.append("data", JSON.stringify(data));

      handleUpdateUserProfile(formData);
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(""); // Reset any previous errors

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    // Use the hook to change the password
    handleChangePassword(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          alert("Password reset successfully!");
          // Reset fields
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
        onError: (error: any) => {
          setPasswordError("Failed to reset password. Please try again.");
        },
      }
    );
  };

  const handleEmailReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setEmailSuccess("");

    if (!email) {
      setEmailError("Please enter a valid email.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/v1/user/forget-password", {
        email,
      });
      setEmailSuccess("Password reset link sent to your email.");
      setEmail(""); // Clear email field
    } catch (error: any) {
      setEmailError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (mainUser) {
      setName(mainUser.name);
      setBio(mainUser.bio || ""); // Set the actual bio, default to empty if not available
      setProfileImage(
        mainUser.profilePicture || "https://www.gravatar.com/avatar/?d=mp"
      ); // Set the profile image
    }
  }, [mainUser]);

  return (
    <div className="container mx-auto mt-10 p-6 max-w-4xl bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-10"
      >
        {/* Profile Image Section */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-full object-cover border border-gray-300"
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

        {/* Bio Input */}
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
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:border-red-500"
            rows={4}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            color="primary"
            style={{ backgroundColor: "#D93900" }}
            className="hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Save Changes
          </Button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-6 text-red-600">Reset Password</h2>
      <form
        onSubmit={handlePasswordReset}
        className="bg-white shadow-md rounded-lg p-6 mb-10"
      >
        {/* Old Password Input */}
        <div className="mb-4">
          <Input
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter your old password"
            fullWidth
          />
        </div>

        {/* New Password Input */}
        <div className="mb-4">
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            fullWidth
          />
        </div>

        {/* Confirm New Password Input */}
        <div className="mb-4">
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            fullWidth
          />
        </div>

        {/* Error Message for Passwords */}
        {passwordError && <p className="text-red-600 mb-4">{passwordError}</p>}

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            color="primary"
            style={{ backgroundColor: "#D93900" }}
            className="hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Reset Password
          </Button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-6 text-red-600">
        Reset Password via Email
      </h2>
      <form
        onSubmit={handleEmailReset}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Email Input */}
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            fullWidth
          />
        </div>

        {/* Error and Success Messages */}
        {emailError && <p className="text-red-600 mb-4">{emailError}</p>}
        {emailSuccess && <p className="text-green-600 mb-4">{emailSuccess}</p>}

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            color="primary"
            style={{ backgroundColor: "#D93900" }}
            className="hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Send Reset Link
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;
