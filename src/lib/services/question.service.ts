export default async function getQuestions(examId: string) {
  const res = await fetch(`/api/questions?examId=${examId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}
