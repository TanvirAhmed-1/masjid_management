"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/src/redux/features/auth/authSlice";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { removeTokenCookie } from "@/src/redux/server/storeCookies";
import Link from "next/link";

function LogoutMenu() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    await removeTokenCookie();
    router.replace("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-10 w-10">
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 h-28 ml-12 bg-gray-300 rounded-lg   ">
        <div className="p-4 space-y-3 *:border *:border-gray-100 *:py-1 *:px-3 *:rounded-xl *:hover:bg-gray-400  *:scale-105 flex flex-col justify-center items-center">
          <Link href={""}>Profile</Link>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LogoutMenu;
