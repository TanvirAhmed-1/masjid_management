"use client";

import { DashboardLinks } from "@/src/constants/DashboardLinks ";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaMosque } from "react-icons/fa";
import { RiArrowDropRightLine } from "react-icons/ri";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // স্টেট: কোন সেকশন ওপেন আছে (initially সেই সেকশন খোলা থাকবে যার সাবরুট ম্যাচ)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // পেজ লোড/পাথ চেঞ্জ হলে আমরা চেক করব কোন মেনু সেকশন ওপেন থাকবে
  useEffect(() => {
    const newOpenSections: Record<string, boolean> = {};

    DashboardLinks.forEach((data) => {
      if (data.hasChildren) {
        // যদি সাবরুটস থেকে কোনো রাউট ম্যাচ করে বর্তমান path এর সাথে,
        // তাহলে ওই সেকশন ওপেন রাখবো
        const isAnySubRouteActive = data.subRoutes?.some((sub) =>
          pathname?.startsWith(sub.route)
        );

        newOpenSections[data.title] = !!isAnySubRouteActive;
      }
    });

    setOpenSections(newOpenSections);
  }, [pathname]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // helper: এই route active কিনা চেক করার জন্য
  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  return (
    <div className="flex mx-auto min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-900 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-center mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <FaMosque className="text-3xl text-amber-300 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white">
                Mosque Management
              </h1>
              <p className="text-emerald-200 text-sm">Admin Dashboard</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {DashboardLinks?.map((data, index) => (
              <div key={index} className="mb-2">
                {data.hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleSection(data.title)}
                      className="flex justify-between items-center w-full p-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300 ease-in-out group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-amber-300 text-lg group-hover:scale-110 transition-transform">
                          {data?.icon}
                        </span>
                        <span className="font-medium">{data.title}</span>
                      </div>
                      {openSections[data.title] ? (
                        <FaChevronUp className="text-sm text-emerald-200" />
                      ) : (
                        <FaChevronDown className="text-sm text-emerald-200" />
                      )}
                    </button>

                    {openSections[data.title] && (
                      <div className="ml-6 mt-2 space-y-1 border-l-2 border-emerald-600/30 pl-4">
                        {data.subRoutes?.map((sub) => (
                          <Link
                            href={sub.route}
                            key={sub.title}
                            className={`text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200
                              ${
                                isActiveRoute(sub.route)
                                  ? "bg-amber-500 text-white shadow-lg transform scale-105"
                                  : "text-emerald-100 hover:bg-white/10 hover:text-white"
                              }`}
                          >
                            <RiArrowDropRightLine className="text-lg" />
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={data.route || "/"}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out group
                      ${
                        isActiveRoute(data.route || "/")
                          ? "bg-amber-500 text-white shadow-lg transform scale-105"
                          : "text-white hover:bg-white/10 hover:scale-105"
                      }`}
                  >
                    <span className="text-amber-300 text-lg group-hover:scale-110 transition-transform">
                      {data?.icon}
                    </span>
                    <span className="font-medium">{data.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="bg-white shadow-sm border-b border-emerald-100">
          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
              <p className="text-sm text-gray-600">Mosque Management System</p>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:bg-white outline-none transition-all duration-200"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">A</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[url('/images/background.svg')] bg-cover bg-center bg-no-repeat overflow-auto">
          <div className="bg-white/40  rounded-xl shadow-sm p-4 min-h-full border border-gray-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
