export default function DiplomaSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 py-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative flex justify-center h-96 overflow-hidden rounded-md bg-blue-100 animate-pulse"
        >
          {/* Image placeholder */}
          <div className="w-full h-full bg-blue-200" />

          {/* Overlay skeleton */}
          <div className="absolute bottom-3 w-11/12 p-5 bg-blue-300/40 backdrop-blur-sm rounded-md">
            {/* Title */}
            <div className="h-5 w-2/3 bg-blue-200 rounded mb-3" />

            {/* Description */}
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full bg-blue-200 rounded" />
              <div className="h-3 w-4/5 bg-blue-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
