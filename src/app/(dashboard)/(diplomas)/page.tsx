import { Metadata } from "next";
import Title from "../_components/title";
import { GraduationCap } from "lucide-react";
import FetchSubject from "./_components/fetch-subject";

export const metadata: Metadata = {
  title: "Diplomas",
  description: "Browse available diplomas and subjects",
};

export default function Home() {
  return (
    <main>
      <Title
        title="Diplomas"
        icon={<GraduationCap className="h-full w-full" />}
      />
      <FetchSubject />
    </main>
  );
}
