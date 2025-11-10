

"use client";
import React from "react";
import {
  Heart,
  Package,
  Mail,
  Phone,

} from "lucide-react";
import { SlWallet } from "react-icons/sl";
import Image from "next/image";


interface StatCardProps {
  label: string;
  value: string;
  Icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

const UserDashboard: React.FC = () => {
  const stats: StatCardProps[] = [
    {
      label: "Total Orders",
      value: "24",
      Icon: Package,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Wallet Balance",
      value: "$285",
      Icon: SlWallet,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Wishlist Items",
      value: "12",
      Icon: Heart,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen space-y-8">
      {/* Header Card */}
      <div className="bg-white rounded-2xl ">
        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 h-48 px-6 sm:px-10 relative rounded-2xl">
          <div className="relative flex items-end justify-between h-full pb-6">
            {/* Profile Image - Positioned at bottom left */}
            <div className="md:absolute -bottom-8 left-6 sm:left-10">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                <Image
                  src="https://images.ctfassets.net/xjcz23wx147q/iegram9XLv7h3GemB5vUR/0345811de2da23fafc79bd00b8e5f1c6/Max_Rehkopf_200x200.jpeg"
                  alt="profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div> */}
            </div>

            {/* User Info - Aligned at bottom */}
            <div className="flex-1  mx-auto  text-white space-y-1.5  ml-3 sm:ml-10  md:ml-52">
              <h1 className="text-xl sm:text-2xl font-bold ">Max Rehkopf</h1>
              <div className="flex  flex-col   flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-white/90">
                <div className="flex items-center gap-1.5 md:text-center">
                  <Mail size={14} />
                  <span>7lV5o@example.com</span>
                </div>
                <div className="flex items-center gap-1.5 r">
                  <Phone size={14} />
                  <span>+1 123 456 7890</span>
                </div>
              </div>
            </div>

            {/* Edit Button - Aligned at bottom right */}
            <button className="bg-white text-blue-600 px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              Edit Profile
            </button>
          </div>
        </div>
        {/* Spacer for profile image overflow */}
        <div className="h-16"></div>
      </div>

      {/* Main Content Grid */}
      <div className="sm:grid flex flex-col-reverse sm:grid-cols-3 gap-6 mt-6">
        {/* Profile Information */}
        <div className="col-span-2 bg-white rounded-xl shadow-md border border-slate-200 p-6">
          <div className="grid grid-cols-2  gap-y-4 gap-x-6 text-gray-800">
            <p className="font-semibold">Name</p>
            <p>Max Rehkopf</p>

            <p className="font-semibold">Date of Birth</p>
            <p>01/01/1990</p>

            <p className="font-semibold">Gender</p>
            <p>Male</p>

            <p className="font-semibold">Phone Number</p>
            <p>+1 123 456 7890</p>

            <p className="font-semibold">Email Address</p>
            <p>7lV5o@example.com</p>

            <p className="font-semibold">Address</p>
            <p>123 Main Street, Anytown, USA</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-col gap-5">
          {stats.map(({ label, value, Icon, iconColor, bgColor }, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">{value}</p>
                </div>
                <div className={`${bgColor} p-3 rounded-xl`}>
                  <Icon size={28} className={`${iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
