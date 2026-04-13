import { ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/layout/sidebar";
import Breadcrumb from "@/components/layout/bread-crumb";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    diploma: string;
    exam: string;
  };
}) {
  console.log(params);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* <Breadcrumb params={params} /> */}
        <Breadcrumb />
        {/* Mobile Floating Trigger */}
        <div className="lg:hidden fixed top-1/2 left-0 -translate-y-1/2 z-50">
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

        <div className="p-3 flex-1 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
