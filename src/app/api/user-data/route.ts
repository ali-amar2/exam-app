import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, });

        if (!token?.accesstoken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const res = await fetch(
            `${process.env.API}/auth/profileData`,
            {
                method: "GET",
                headers: {
                    token: token.accesstoken as string,
                },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || "Failed to fetch profile" },
                { status: res.status }
            );
        }

        return NextResponse.json(data.user ?? data);
    } catch (error) {
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}
