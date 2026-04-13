import QuestionView from "@/app/(dashboard)/_components/questions/questions-view";
import Title from "@/components/layout/title";
import { getExamQuestions } from "@/lib/services/question.service";
import { CircleQuestionMark } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions",
  description: "Browse available Diploma's Exams and Get the Results ",
};

interface PageProps {
  params: {
    exam: string;
  };
}
export default async function Page({ params }: PageProps) {
  const data = await getExamQuestions(params.exam);
  return (
    <main>
      <Title
        title="Questions"
        icon={<CircleQuestionMark className="h-full w-full" />}
      />
      <QuestionView initialData={data} examId={params.exam} />
    </main>
  );
}
