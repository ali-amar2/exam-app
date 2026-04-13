import { getToken } from "../../utils/get-token";

export default async function getExams({
  diplomaId,
  page = 1,
  limit = 20,
}: GetExamsParams): Promise<ExamsResponse> {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.API}/exams?diplomaId=${diplomaId}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accesstoken}`,
        },

        cache: "no-store",
      },
    );

    const data: ExamsResponse = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch exams");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
