import React from "react";
import { FaMosque } from "react-icons/fa";
type Props = {
  className?: string;
};
const LoaderScreen = ({ className }: Props) => {
  return (
    <div className={`flex items-center justify-center h-[500px]  ${className}`}>
      <div className="text-center">
        {/* Mosque Icon with Animation */}
        <div className="relative inline-block mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-emerald-200 rounded-full animate-ping opacity-75"></div>
          </div>

          {/* Middle Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 border-4 border-teal-300 rounded-full animate-pulse"></div>
          </div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 flex items-center justify-center animate-spin">
            <div className="w-24 h-24 border-t-4 border-emerald-500 rounded-full"></div>
          </div>

          {/* Mosque Icon */}
          <div className="relative z-10 flex items-center justify-center w-32 h-32">
            <FaMosque className="text-4xl text-emerald-600 animate-bounce" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <p className="text-gray-600 animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoaderScreen;
