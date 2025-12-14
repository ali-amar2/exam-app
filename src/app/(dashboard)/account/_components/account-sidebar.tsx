"use client"
import { cn } from "@/lib/utils/tailwind-merge";
import { CircleUserRound, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AccountSidebar() {
    const pathname = usePathname()
    return (
        <aside className="bg-white w-72 ">
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


        </aside>
    )
}

""