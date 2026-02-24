import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <Spinner className="size-11 text-blue-500" />
    </div>
  );
}
