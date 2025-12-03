import { CircleX } from "lucide-react";

export default function ErrorBox({ message }: { message: string }) {
    return (
        <div className="relative border border-red-500 bg-red-50 text-red-600 py-3 px-4 rounded flex flex-col items-center justify-center gap-1">
            <CircleX className="absolute -top-3 w-6 h-6 rounded-full p-[2px] bg-white" />
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
}
