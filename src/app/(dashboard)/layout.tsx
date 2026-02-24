// import Header from "./_components/header";
// import Sidebar from "./_components/sidebar";

// export default function Layout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex flex-col w-full bg-white ml-[23rem]">
//           <Header />
//           <div className="min-h-[calc(100vh-48px)] p-3">{children}</div>
//         </div>
//       </div>
//     </>
//   );
// }

import Header from "./_components/header";
import Sidebar from "./_components/sidebar";
import { ChevronRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Mobile Floating Trigger */}
        <div className="md:hidden fixed top-1/2 left-0 -translate-y-1/2 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white
                   p-3 rounded-r-xl shadow-lg
                   transition-all duration-300
                   hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-80 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="p-3 flex-1">{children}</div>
      </div>
    </div>
  );
}
