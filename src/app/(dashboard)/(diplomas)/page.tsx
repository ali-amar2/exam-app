import { Metadata } from "next";
import Title from "../../../components/layout/title";
import { GraduationCap } from "lucide-react";
import DiplomasGrid from "../_components/diplomas/diplomas-grid";

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
      <DiplomasGrid />
    </main>
  );
}
