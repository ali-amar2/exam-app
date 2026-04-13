import { SubmitExamRequest } from "../types/submissions";

export async function submitExam(payload: SubmitExamRequest) {
  const res = await fetch("/api/submissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit exam");
  }

  return data;
}
