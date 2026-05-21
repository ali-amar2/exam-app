export default function DiplomaSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 py-2"
      aria-label="Loading diplomas"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative flex justify-center h-96 overflow-hidden rounded-xl bg-slate-200 animate-pulse"
        >
          {/* Image placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200" />

          {/* Overlay skeleton */}
          <div className="absolute bottom-3 w-[92%] p-5 bg-white/20 backdrop-blur-md rounded-lg border border-white/10">
            {/* Title */}
            <div className="h-5 w-2/3 bg-slate-200/80 rounded-md mb-4" />

            {/* Description */}
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full bg-slate-200/70 rounded-md" />
              <div className="h-3 w-5/6 bg-slate-200/70 rounded-md" />
              <div className="h-3 w-3/4 bg-slate-200/70 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
