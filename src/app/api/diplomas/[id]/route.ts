import { NextResponse } from "next/server";
import { getToken } from "@/lib/utils/get-token";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const token = await getToken();

  const res = await fetch(`${process.env.API}/diplomas/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token?.accesstoken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data);
}
