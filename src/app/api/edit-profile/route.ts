import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token?.accesstoken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const res = await fetch(
            "https://exam.elevateegy.com/api/v1/auth/editProfile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token.accesstoken,
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || "Update failed" },
                { status: res.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}
