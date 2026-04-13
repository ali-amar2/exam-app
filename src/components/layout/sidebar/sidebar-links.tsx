"use client";

import { GraduationCap, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinks() {
  // Hooks
  const pathname = usePathname();

  // Variables
  const isAccount = pathname.startsWith("/account");

  // Functions
  const getLink = (type: "home" | "account") => {
    const isActive = type === "account" ? isAccount : !isAccount;
    return `flex gap-3 text-lg p-4 ${
      isActive
        ? "border border-blue-500 bg-blue-100 text-blue-500 w-[98%]"
        : "text-gray-600"
    }`;
  };

  return (
    <ul className="flex gap-2 flex-col justify-center text-gray-500 ml-2">
      <li>
        <Link href="/" className={getLink("home")}>
          <GraduationCap className="text-3xl" />
          <span>Diplomas</span>
        </Link>
      </li>

      <li>
        <Link href="/account" className={getLink("account")}>
          <UserRound className="text-3xl" />
          <span>Account Settings</span>
        </Link>
      </li>
    </ul>
  );
}
