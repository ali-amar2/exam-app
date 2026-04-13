export async function getDiplomas(page = 1, limit = 6) {
  const res = await fetch(`/api/diplomas?page=${page}&limit=${limit}`, {
    method: "GET",
    cache: "no-store",
  });

  const data: DiplomasResponse = await res.json();

  if (!res.ok || !data.status) {
    throw new Error("Failed to fetch diplomas");
  }

  return data.payload;
}

export async function getDiplomaById(id: string) {
  const res = await fetch(`/api/diplomas/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch diploma");
  }

  return res.json();
}
