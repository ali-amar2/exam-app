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
    <div className="text-gray-400 bg-white p-4 flex gap-2 text-lg items-center">
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
