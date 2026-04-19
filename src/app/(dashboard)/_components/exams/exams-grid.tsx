import getExams from "@/lib/services/exams/exams.service";
import { Exam } from "@/lib/types/exam";
import { normalizeImageUrl } from "@/lib/utils/image-url";
import { CircleQuestionMark, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ExamsGrid({ diplomaId }: { diplomaId: string }) {
  // Services
  const data = await getExams({ diplomaId });

  // variables
  const exams = data.payload.data;

  if (exams.length === 0) {
    return (
      <div className="flex justify-center items-center text-center py-10 text-red-500">
        No exams found for this diploma
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 p-4 pb-0">
      {exams.map((exam: Exam) => (
        <Link
          href={`/${diplomaId}/${exam.id}`}
          key={exam.id}
          className=" flex flex-col sm:flex-row justify-betweenw-full bg-blue-50 border border-transparent hover:border-blue-300 rounded-lg p-3 sm:p-4 shadow-sm transition-all duration-300 gap-4 sm:gap-0"
        >
          {/* Image */}
          <div className=" w-full sm:w-28 h-40 sm:h-24 mr-0 sm:mr-4 bg-white border border-blue-200 rounded-md p-3 sm:p-4 flex items-center justify-center">
            <Image
              width={100}
              height={0}
              src={normalizeImageUrl(exam.image)}
              alt={exam.title}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col flex-1 w-full">
            {/* Question numbers & Timer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-blue-600 ">
                {exam.title}
              </h2>
              <div className=" flex flex-wrap gap-2 sm:gap-3 font-bold text-zinc-500 text-xs sm:text-sm">
                <span className="flex items-center gap-2">
                  <CircleQuestionMark size={16} />
                  {exam.questionsCount} Questions
                </span>
                <span className="flex items-center gap-2">
                  <Timer size={16} />
                  {exam.duration} minutes
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 md:line-clamp-none mt-2">
              {exam.description}
            </p>
          </div>
        </Link>
      ))}
      <span className="text-gray-500 m-auto text-sm">End of list</span>
    </section>
  );
}
