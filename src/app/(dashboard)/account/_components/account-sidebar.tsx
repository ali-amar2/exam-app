"use client"
import { cn } from "@/lib/utils/tailwind-merge";
import { CircleUserRound, Lock, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
export default function AccountSidebar() {
    const pathname = usePathname()

    return (
        <aside className="bg-white w-72 flex flex-col justify-between ">
            <ul className="flex flex-col justify-center items-center py-10 gap-5">
                <li className="w-5/6 text-gray-500">
                    <Link href="/account" className={cn("flex gap-3 w-full p-3", pathname === "/account" ? "text-blue-500 bg-blue-50" : "text-gray-500 ")}>
                        <CircleUserRound /> Profile
                    </Link>

                </li>
                <li className="w-5/6 text-gray-500">
                    <Link href="/account/change-password" className={cn("flex gap-3 w-full p-3", pathname === "/account/change-password" ? "text-blue-500 bg-blue-50" : "text-gray-500 ")}>
                        <Lock /> Change Password
                    </Link>

                </li>
            </ul>

            <div className="w-full mb-2 flex justify-center items-center">
                <button className=" flex gap-3 p-3 w-5/6 text-red-600 bg-red-50 " onClick={() => signOut()}><LogOut /> Logout</button>
            </div>
        </aside>
    )
}

""