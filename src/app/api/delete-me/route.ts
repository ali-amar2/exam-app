import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token?.accesstoken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const res = await fetch(
            `${process.env.API}/auth/deleteMe`,
            {
                method: "DELETE",
                headers: {
                    token: token.accesstoken,
                },
            }
        );

        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json(error, { status: res.status });
        }

        return NextResponse.json({ message: "Account deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}
