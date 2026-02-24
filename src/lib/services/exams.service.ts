export default async function getExams() {
  const res = await fetch(`/api/exams`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch subjects");
  }
  return res.json();
}
