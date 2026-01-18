// components/LoadingButton.tsx
import React, { ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../ui/button";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  loadingText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  loadingText = "Loading...",
  children,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      disabled={isLoading || rest.disabled}
      className={`flex items-center justify-center space-x-1 px-4 py-2 rounded ${
        isLoading
          ? "bg-blue-600 text-white cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } ${rest.className || ""}`}
    >
      {isLoading && <FaSpinner className="animate-spin h-5 w-5" />}
      <span>{isLoading ? loadingText : children}</span>
    </Button>
  );
};

export default LoadingButton;
