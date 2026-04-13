import Image from "next/image";
import logo from "@assets/imgs/elevate.webp";
import user from "@assets/imgs/user.webp";
import { FolderCode } from "lucide-react";
import SidebarLinks from "./sidebar-links";
import { SidebarDropdown } from "./sidebar-dropdown";
import { getUserProfile } from "@/lib/services/user-profile.service";

export default async function Sidebar() {
  // variables
  const userData = await getUserProfile();
  const imageSrc = userData?.profilePhoto || user;

  if (!userData) {
    return null;
  }

  return (
    <aside className="flex flex-col gap-16 min-h-screen justify-between w-80 fixed bg-blue-50 pt-8 pb-2">
      <div className="flex flex-col gap-16">
        {/* sidebar header  */}
        <header className="flex flex-col items-start gap-2">
          <Image src={logo} alt="Elevate logo" width={180} priority />
          <div className="flex items-center gap-3 ml-2">
            <FolderCode className="w-8 h-8 text-blue-600" />
            <h2 className="text-blue-700 text-xl font-bold">Exam App</h2>
          </div>
        </header>

        <SidebarLinks />
      </div>
      <div className="flex gap-2 justify-center items-center px-2">
        {/* User profile photo  */}
        <div className="w-10 h-10 border overflow-hidden border-blue-600">
          <Image
            src={imageSrc}
            alt="User Profile Photo"
            className="w-full"
          ></Image>
        </div>

        <div className="flex flex-col text-sm">
          <span className="text-blue-600 font-bold">{userData.firstName}</span>
          <span className="text-gray-500">{userData.email}</span>
        </div>
        <SidebarDropdown />
      </div>
    </aside>
  );
}
