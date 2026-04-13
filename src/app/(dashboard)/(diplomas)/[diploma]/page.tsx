import { BookOpenCheck } from "lucide-react";
import Title from "../../../../components/layout/title";
import { Metadata } from "next";
import ExamsGrid from "../../_components/exams/exams-grid";
import { Suspense } from "react";
import ExamsSkeleton from "../../_components/exams/exams-skeleton";

interface PageProps {
  params: {
    diploma: string;
  };
}

export const metadata: Metadata = {
  title: "Exams",
  description: "Take the exam, answer questions, and get instant results.",
};

export default function Page({ params }: PageProps) {
  const { diploma } = params;

  return (
    <main className="bg-white">
      <Title title="Exams" icon={<BookOpenCheck className="h-full w-full" />} />
      <Suspense fallback={<ExamsSkeleton />}>
        <ExamsGrid diplomaId={diploma} />
      </Suspense>
    </main>
  );
}
