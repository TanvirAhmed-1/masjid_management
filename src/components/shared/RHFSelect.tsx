"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface RHFSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  required?: boolean | string;
}

const RHFSelect: React.FC<RHFSelectProps> = ({
  label,
  name,
  options,
  placeholder = "Select an option",
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
      <select
        id={name}
        {...register(name, { required })}
        className={`w-full rounded-lg border-2 p-2 text-sm focus:outline-none ${
          fieldError ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
    </div>
  );
};

export default RHFSelect;
