import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req })
        if (!token || !token.accesstoken) {
            return NextResponse.json({ code: 401, message: "Unauthorized - No valid token" })
        }
        const { searchParams } = new URL(req.url)
        const examId = searchParams.get("examId")

        if (!examId) {
            return NextResponse.json(
                { message: "examId is required" },
                { status: 400 }
            );
        }

        const response = await fetch(`${process.env.API}/questions?exam=${examId}`, {
            method: "GET",
            headers: {
                token: token.accesstoken,
                "Content-Type": "application/json",
            },
            cache: "no-store"
        })
        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to fetch questions" },
                { status: response.status }
            );
        }
        const payload = await response.json();
        return NextResponse.json(payload);

    } catch (error) {
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }

}