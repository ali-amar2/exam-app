import { QuestionsPayload } from "../types/question";
import { getToken } from "../utils/get-token";

export async function getExamQuestions(
  examId: string,
): Promise<QuestionsPayload> {
  try {
    const token = await getToken();

    const res = await fetch(`${process.env.API}/questions/exam/${examId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accesstoken}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || !data?.status) {
      throw new Error(data?.message || "Failed to fetch questions");
    }

    return data.payload;
  } catch (error: any) {
    console.error("getExamQuestions error:", error.message);

    throw new Error(
      error?.message || "Something went wrong while fetching questions",
    );
  }
}
