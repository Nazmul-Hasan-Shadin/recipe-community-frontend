import React from "react";
import { useFormContext } from "react-hook-form";

interface ImageInputProps {
  label: string;
  name: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RCImageInput = ({ label, name, onImageChange }: ImageInputProps) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        {...register(name)}
        onChange={onImageChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
    </div>
  );
};

export default RCImageInput;
