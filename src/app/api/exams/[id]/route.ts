import { getToken } from "@/lib/utils/get-token";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const token = await getToken();

  const res = await fetch(`${process.env.API}/exams/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accesstoken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data);
}
