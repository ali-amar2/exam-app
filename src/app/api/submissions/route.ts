import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token?.accesstoken) {
      return NextResponse.json(
        { status: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const res = await fetch(`${process.env.API}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accesstoken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      return NextResponse.json(
        { status: false, message: data.message },
        { status: res.status },
      );
    }

    return NextResponse.json(data.payload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
