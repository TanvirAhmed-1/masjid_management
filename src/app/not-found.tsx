"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [currentDate, setCurrentDate] = useState<string>("");

  // Run only on client after mount
  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formatted);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* show video  */}
      <div className="w-full flex justify-center h-64 overflow-hidden">
        <video autoPlay loop muted className="w-full max-w-md">
          <source src="/404.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="-mt-14">
        <h2 className="text-2xl font-semibold mt-4">Oops! Page not found</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      {/* Bottom Date */}
      {currentDate && (
        <footer className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400">
          © {currentDate}
        </footer>
      )}   
    </div>
  );
}
