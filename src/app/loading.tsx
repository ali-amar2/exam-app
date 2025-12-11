import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Spinner className="size-11 text-blue-500" />
        </div>
    )
}
