"use client";
import { useQuery } from "@tanstack/react-query";
import getQuestions from "@/lib/services/question.service";

export default function useQuestions(examId: string) {
  return useQuery({
    queryKey: ["questions", examId],
    queryFn: () => getQuestions(examId),
    enabled: !!examId,
  });
}
