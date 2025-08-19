"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

interface RHFInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean | string;
}

const RHFInput: React.FC<RHFInputProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className={`text-sm w-full rounded-lg border-2 p-2 focus:outline-none ${
          fieldError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
    </div>
  );
};

export default RHFInput;
