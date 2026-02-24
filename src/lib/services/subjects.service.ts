export async function getSubjects(page = 1, limit = 6) {
  const res = await fetch(`/api/subjects?&limit=${limit}page=${page}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subjects");
  }

  return res.json();
}
