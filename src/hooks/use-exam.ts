import getExams from "@/lib/services/exams.service";
import { useQuery } from "@tanstack/react-query";

export default function useExam() {
  return useQuery({
    queryKey: ["exams"],
    queryFn: () => getExams(),
  });
}
