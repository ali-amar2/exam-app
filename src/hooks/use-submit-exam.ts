"use client";

import { useMutation } from "@tanstack/react-query";
import { submitExam } from "@/lib/services/submissions.service";
import { SubmitExamRequest, SubmitExamResponse } from "@/lib/types/submissions";

export function useSubmitExam() {
  return useMutation<SubmitExamResponse, Error, SubmitExamRequest>({
    mutationFn: submitExam,
  });
}
