"use server";

import { registerValues } from "@/lib/schemas/auth.schema";
import { ApiResponse, SuccessResponse } from "@/lib/types/api";

export async function registerAction(data: registerValues) {
  try {
    const response = await fetch(`${process.env.API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload: ApiResponse = await response.json();

    if (!response.ok || !payload.status) {
      throw new Error(
        payload.message || "Registration failed. Please try again.",
      );
    }

    const successPayload = payload as SuccessResponse;

    return {
      message: successPayload.message,
      token: successPayload.token,
      user: successPayload.user,
    };
  } catch (error: any) {
    throw new Error(
      error.message?.includes("Network")
        ? "Cannot connect to server. Please check your internet connection."
        : error.message || "Something went wrong. Please try again.",
    );
  }
}
