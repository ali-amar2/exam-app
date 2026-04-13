export default function ExamsSkeleton() {
  return (
    <section className="flex flex-col gap-5 p-4 pb-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row w-full bg-blue-50 rounded-lg p-4 gap-4 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full sm:w-28 h-40 sm:h-24 bg-blue-100 rounded-md" />

          {/* Content */}
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-col md:flex-row justify-between gap-3">
              <div className="h-4 w-40 bg-blue-100 rounded" />

              <div className="flex gap-3">
                <div className="h-3 w-24 bg-blue-100 rounded" />
                <div className="h-3 w-24 bg-blue-100 rounded" />
              </div>
            </div>

            <div className="h-3 w-full bg-blue-100 rounded" />
            <div className="h-3 w-3/4 bg-blue-100 rounded" />
          </div>
        </div>
      ))}
    </section>
  );
}
