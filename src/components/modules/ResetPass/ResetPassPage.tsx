"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const ResetPassPage = () => {
  const params = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if id and token are available in the URL
    const id = params.get("id");
    const token = params.get("token");

    if (!id || !token) {
      setError(
        "Invalid reset link. Please check your email for the correct link."
      );
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const id = params.get("id");
    const token = params.get("token");

    if (!id || !token) {
      setError(
        "Invalid reset link. Please check your email for the correct link."
      );
      return;
    }

    try {
      const response = await axios.patch(
        "https://recipe-sharing-community.vercel.app/api/v1/user/reset-password",
        {
          userId: id,
          token: token,
          newPassword: newPassword,
        }
      );


      // Handle success
      setMessage(
        "Password reset successfully! You can now log in with your new password."
      );
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        {/* New Password Input */}
        <div className="mb-4">
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            fullWidth
            required
          />
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <div className="flex justify-end">
          <Button
            type="submit"
            color="primary"
            style={{ backgroundColor: "#00725A" }}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassPage;
