"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/src/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { removeTokenCookie } from "@/src/redux/server/storeCookies";
import Link from "next/link";
import { FaMosque } from "react-icons/fa";
import { useState } from "react";

function LogoutMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    await removeTokenCookie();
    router.replace("/login");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Trigger: Icon/Avatar section */}
      <DropdownMenuTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="cursor-pointer h-10 w-20 flex items-center justify-center rounded-full bg-emerald-50 hover:bg-emerald-100 transition border border-emerald-200"
        >
          <FaMosque className="text-xl text-emerald-600" />
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        sideOffset={5}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="z-50 w-40 bg-white border border-slate-200 rounded-xl shadow-xl p-1 animate-in fade-in slide-in-from-top-2"
      >
        <div className="flex flex-col">
          {/* Profile Link: Slate Color */}
          <Link
            href="/profile"
            className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition font-medium"
            onClick={() => setOpen(false)}
          >
            My Profile
          </Link>

          {/* Logout Button: Red Color */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="outline-none px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 cursor-pointer font-medium transition"
          >
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LogoutMenu;
