"use client";

import { getExamQuestions } from "@/lib/services/question.service";
import { useQuery } from "@tanstack/react-query";

export default function useQuestions(examId: string) {
  return useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: () => getExamQuestions(examId),
    enabled: !!examId,
    staleTime: 1000 * 60 * 5,
  });
}
