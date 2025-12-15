import { BookOpenCheck } from "lucide-react";
import Title from "../../_components/title";
import FetchExams from "../_components/fetch-exams";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Exams",
    description: "Take the exam, answer questions, and get instant results."
};

export default function Page() {

    return (
        <main>
            <Title title="Exams" icon={<BookOpenCheck className="h-full w-full" />} />
            <FetchExams />
        </main>
    );
}
