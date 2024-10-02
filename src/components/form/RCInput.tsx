"use client";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface ITprops {
  label: string;
  type: string;
  name: string;
  variant?: "flat" | "faded" | "bordered" | "underlined";
}

const RCInput = ({ label, type, name, variant = "bordered" }: ITprops) => {
  const { register } = useFormContext();
  return (
    <Input
      width={"350px"}
      variant={variant}
      {...register(name)}
      type={type}
      size="sm"
      label={label}
    />
  );
};

export default RCInput;
