"use server";
import { registerValues } from "@/lib/schemas/auth.schema";
import { ApiResponse } from "@/lib/types/api";

export async function registerAction(data: registerValues) {
  try {
    const response = await fetch(`${process.env.API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const payload: ApiResponse = await response.json();

    if ("code" in payload) {
      return {
        message: payload.message,
        code: payload.code,
      };
    }
    return {
      message: payload.message,
      token: payload.token,
      user: payload.user,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong.",
      code: 409,
    };
  }
}
