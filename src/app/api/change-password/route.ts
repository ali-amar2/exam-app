import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token?.accesstoken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const response = await fetch(
            `${process.env.API}/auth/changePassword`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    token: token.accesstoken,
                },
                body: JSON.stringify(body),
            }
        );

        const payload = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: payload.message || "Change password failed" },
                { status: response.status }
            );
        }

        return NextResponse.json(payload);

    } catch (error) {
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}
