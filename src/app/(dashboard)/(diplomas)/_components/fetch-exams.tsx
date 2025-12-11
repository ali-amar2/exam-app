"use client";
import Loading from "@/app/loading";
import useExam from "@/hooks/use-exam";
import { Exam } from "@/lib/types/exam";
import { Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FetchExams() {

    const pathname = usePathname();

    const { data, isLoading, isError } = useExam();
    console.log(data);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[31rem]">
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-center py-4 my-2 text-red-500 bg-red-100">
                    Error loading Exams
                </p>
            </div>
        );
    }
    return (
        <div className="flex flex-col py-2 gap-4 my-2">
            {data.exams.map((exam: Exam) => (
                <Link
                    key={exam._id}
                    href={`${pathname}/${exam._id}`}
                    className="relative flex justify-center"
                >
                    <div className="bg-blue-50 w-full flex p-5 justify-between items-center text-blue-600">
                        <div className="flex flex-col">
                            <h3 className="font-bold">{exam.title}</h3>
                            <span className="text-gray-500">{exam.numberOfQuestions + " Questions"}</span>
                        </div>
                        <p className="text-gray-800 flex gap-2 text-sm items-center">
                            <Timer className="text-gray-500" />
                            Duration: {exam.duration + " Minutes"}

                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
