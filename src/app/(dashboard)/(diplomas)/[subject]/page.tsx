import { BookOpenCheck } from "lucide-react";
import Title from "../../_components/title";
import FetchExams from "../_components/fetch-exams";
export default function Page() {


    return (
        <main>
            <Title title="Exams" icon={<BookOpenCheck className="h-full w-full" />} />
            <FetchExams />
        </main>
    );
}
