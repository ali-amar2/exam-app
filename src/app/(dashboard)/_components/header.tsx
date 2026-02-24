"use client";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const accountIndex = segments.indexOf("account");
  const visibleSegments =
    accountIndex !== -1 ? segments.slice(0, accountIndex + 1) : segments;
  const routeNames: Record<string, string> = {
    "/": "Home",
    exams: "Exams",
    questions: "Questions",
    account: "Account",
  };

  const isId = (str: string) => /^[a-f0-9]{10,}$/i.test(str);

  const formatSegment = (segment: string, index: number) => {
    if (routeNames[segment]) return routeNames[segment];
    if (segment.includes("-")) return segment.split("-")[0];
    if (isId(segment)) {
      if (index === 0) return "Exams";
      if (index === 1) return "Questions";
    }
    return segment;
  };

  const trail = [
    "Home",
    ...visibleSegments.map((seg, i) => formatSegment(seg, i)),
  ];

  return (
    <div className="text-gray-400 bg-white p-4 flex gap-2 items-center">
      {trail.map((label, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && <span>/</span>}
          <span
            className={
              idx === trail.length - 1
                ? "text-blue-600 font-medium capitalize"
                : "capitalize"
            }
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
