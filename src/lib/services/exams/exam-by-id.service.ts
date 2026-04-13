export async function getExamById(id: string) {
  const res = await fetch(`/api/exams/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch exam");

  return res.json();
}
