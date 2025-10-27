"use client";
import { DashboardLinks } from "@/src/constants/DashboardLinks ";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaMosque,
  FaBars,
  FaTimes,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { RiArrowDropRightLine } from "react-icons/ri";
import LogoutMenu from "../ui/logout";
import { useAppSelector } from "@/src/redux/hook";


function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
    const username = useAppSelector((state) => state.auth.username);

    console.log("username", username);

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Section toggle state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Auto-open sections based on current path
  useEffect(() => {
    const newOpenSections: Record<string, boolean> = {};

    DashboardLinks.forEach((data) => {
      if (data.hasChildren) {
        const isAnySubRouteActive = data.subRoutes?.some((sub) =>
          pathname?.startsWith(sub.route)
        );
        newOpenSections[data.title] = !!isAnySubRouteActive;
      }
    });

    setOpenSections(newOpenSections);
  }, [pathname]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 sm:w-80 lg:w-72 xl:w-80
        bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-900 
        shadow-2xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-white/80 hover:text-white p-2"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-4 sm:p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
            <FaMosque className="text-2xl sm:text-3xl text-amber-300 mr-2 sm:mr-3 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-lg font-semibold text-white truncate">
                Mosque Management
              </h1>
              <p className="text-emerald-200 text-xs sm:text-sm truncate">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 sm:space-y-2">
            {DashboardLinks?.map((data, index) => (
              <div key={index} className="mb-1 sm:mb-2">
                {data.hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleSection(data.title)}
                      className="flex justify-between items-center w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-white hover:bg-white/10 transition-all duration-300 ease-in-out group"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <span className="text-amber-300 text-base sm:text-lg group-hover:scale-110 transition-transform flex-shrink-0">
                          {data?.icon}
                        </span>
                        <span className="font-medium text-sm sm:text-base truncate">
                          {data.title}
                        </span>
                      </div>
                      {openSections[data.title] ? (
                        <FaChevronUp className="text-xs sm:text-sm text-emerald-200 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="text-xs sm:text-sm text-emerald-200 flex-shrink-0" />
                      )}
                    </button>

                    {openSections[data.title] && (
                      <div className="ml-4 sm:ml-6 mt-2 space-y-1 border-l-2 border-emerald-600/30 pl-3 sm:pl-4">
                        {data.subRoutes?.map((sub) => (
                          <Link
                            href={sub.route}
                            key={sub.title}
                            className={`text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200
                              ${
                                isActiveRoute(sub.route)
                                  ? "bg-amber-500 text-white shadow-lg"
                                  : "text-emerald-100 hover:bg-white/10 hover:text-white"
                              }`}
                          >
                            <RiArrowDropRightLine className="text-base sm:text-lg flex-shrink-0" />
                            <span className="truncate">{sub.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={data.route || "/"}
                    className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ease-in-out group
                      ${
                        isActiveRoute(data.route || "/")
                          ? "bg-amber-500 text-white shadow-lg"
                          : "text-white hover:bg-white/10 hover:scale-105"
                      }`}
                  >
                    <span className="text-amber-300 text-base sm:text-lg group-hover:scale-110 transition-transform flex-shrink-0">
                      {data?.icon}
                    </span>
                    <span className="font-medium text-sm sm:text-base truncate">
                      {data.title}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3">
            {/* Left section with hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaBars size={18} />
              </button>
              <div className="hidden sm:block">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 hidden md:block">
                  Mosque Management System
                </p>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search - Hidden on mobile, show on tablet+ */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:bg-white outline-none transition-all duration-200"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              {/* Search icon for mobile */}
              <button className="md:hidden text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaSearch size={16} />
              </button>

              {/* Notifications */}
              <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <FaBell size={16} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                  {/* <span className="text-white text-xs font-semibold"></span> */}
                  <LogoutMenu/>
                </div>
                <span className="text-sm text-gray-700 font-medium hidden sm:block">
                 {username? username: "Admin"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 bg-[url('/images/background.svg')] bg-cover bg-center bg-no-repeat overflow-auto">
          <div className="bg-white/10 sm:bg-white/40  rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 min-h-full border border-gray-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
