"use client"
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Title({ title, icon }: PageTitleProps) {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className="flex gap-3 h-20">
            {pathname !== "/" ? (
                <div className="flex justify-center items-center border-2 border-blue-500 cursor-pointer w-8 bg-white" onClick={() => router.back()}><ChevronLeft className="text-blue-500" /></div>
            ) : ""}
            <div className="w-full bg-blue-600 font-medium text-white px-6 py-3 flex items-center gap-3">
                {icon && (
                    <div className="flexitems-center justify-center w-9 h-9">
                        {icon}
                    </div>
                )}
                <h1 className="text-3xl font-inter">{title}</h1>
            </div>
        </div>

    );
}
