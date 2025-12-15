import Title from "@/app/(dashboard)/_components/title";
import { CircleQuestionMark } from "lucide-react";
import FetchQuestions from "../../_components/fetch-question";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Questions",
    description: "Browse available Diploma's Exams and Get the Results ",
};

export default function Page() {

    return (
        <main>
            <Title title="Questions" icon={<CircleQuestionMark className="h-full w-full" />} />
            <FetchQuestions />
        </main>
    );
}
