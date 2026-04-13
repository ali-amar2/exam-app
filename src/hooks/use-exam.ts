"use client";

import { getExamById } from "@/lib/services/exams/exam-by-id.service";
import { useQuery } from "@tanstack/react-query";

export function useExam(id: string) {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: () => getExamById(id),
    enabled: !!id,
  });
}
