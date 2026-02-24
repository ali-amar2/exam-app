import Image from "next/image";
import logo from "@assets/imgs/elevate.webp";
import user from "@assets/imgs/user.webp";
import { FolderCode } from "lucide-react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/auth";
import { SidebarDropdown } from "@/app/(dashboard)/_components/sidebar/sidebar-dropdown";
import SidebarLinks from "./sidebar-links";

export default async function Sidebar() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <aside className="flex flex-col gap-16 min-h-screen justify-between w-80 fixed bg-blue-50 pt-8 pb-2">
      <div className="flex flex-col gap-16">
        <header className="flex flex-col items-start gap-2">
          <Image src={logo} alt="Elevate logo" width={180} priority />
          <div className="flex items-center gap-3 ml-2">
            <FolderCode className="w-8 h-8 text-blue-600" />
            <h2 className="text-blue-700 text-xl font-bold">Exam App</h2>
          </div>
        </header>
        <SidebarLinks />
      </div>
      <div className="flex gap-2 justify-center items-center">
        <div className="w-11 h-11 border overflow-hidden border-blue-600">
          <Image src={user} alt="Uesr Photo" className="w-full"></Image>
        </div>
        <div className="flex flex-col text-sm">
          <span className="text-blue-600 ">{session?.user.firstName}</span>
          <span className="text-gray-500">{session?.user.email}</span>
        </div>
        <SidebarDropdown />
      </div>
    </aside>
  );
}
