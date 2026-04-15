"use client";

import { usePathname } from "next/navigation";
import { useExam } from "@/hooks/use-exam";
import { useDiploma } from "@/hooks/use-diplomas";

export default function Breadcrumb() {
  // Hooks
  const pathname = usePathname();

  // Variables
  const segments = pathname.split("/").filter(Boolean);
  const isAccountRoute = segments[0] === "account";

  const diplomaId = segments[0];
  const examId = segments[1];

  // Queries
  const { data: diplomaData } = useDiploma(diplomaId || "");
  const { data: examData } = useExam(examId || "");

  const diplomaTitle = diplomaData?.payload?.diploma?.title;
  const examTitle = examData?.payload?.exam?.title;

  const routeNames: Record<string, string> = {
    exams: "Exams",
    questions: "Questions",
    account: "Account",
  };

  // Functions
  const formatSegment = (segment: string, index: number) => {
    if (index === 0) return diplomaTitle;
    if (index === 1) return examTitle;
    return routeNames[segment] || segment;
  };

  const accountTrail = [
    "Account",
    ...segments
      .slice(1)
      .map((seg) =>
        routeNames[seg] ? routeNames[seg] : seg.replace("-", " "),
      ),
  ];

  const trail = isAccountRoute
    ? accountTrail
    : ["Diplomas", ...segments.map((seg, i) => formatSegment(seg, i))];

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white p-4 border-b border-gray-100"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-gray-500 text-sm sm:text-base md:text-lg">
        {trail.map((label, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && "/"}

            <span
              className={`
                capitalize transition-colors duration-200
                ${
                  idx === trail.length - 1
                    ? "text-blue-600 font-semibold"
                    : "hover:text-gray-700 cursor-default"
                }
              `}
            >
              {label || "..."}{" "}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
