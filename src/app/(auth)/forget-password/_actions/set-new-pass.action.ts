"use server";
import { newPasswordValues } from "@/lib/schemas/auth.schema";

export default async function SetNewPassAction(data: newPasswordValues) {
  try {
    const response = await fetch(`${process.env.API}/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
      message: payload.message,
      token: payload.token,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
