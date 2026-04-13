import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token?.accesstoken) {
      return NextResponse.json(
        {
          status: false,
          code: 401,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "6";

    const res = await fetch(
      `${process.env.API}/diplomas?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accesstoken}`,
        },
      },
    );

    const data = await res.json();

    if (!res.ok || !data.status) {
      return NextResponse.json(
        {
          status: false,
          code: res.status,
          message: data.message || "Failed to fetch diplomas",
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
