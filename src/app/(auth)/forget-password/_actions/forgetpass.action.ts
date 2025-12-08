"use server";
import { forgetPassValues } from "@/lib/schemas/auth.schema";

export default async function ForgetpassAction(data: forgetPassValues) {
    try {
        const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),

        });

        const payload = await response.json();
        if ("code" in payload) {
            return {
                success: false,
                message: payload.message,
            };
        }

        return {
            success: true,
            message: payload.info,
        };

    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        }

    }
}