"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");

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
      const errorMessage =
        error?.response?.data?.message || "An error occurred.";
      setEmailError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-md bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Forgot Password
      </h1>

      <form
        onSubmit={handleEmailReset}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            fullWidth
            required
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

export default ForgotPassword;
