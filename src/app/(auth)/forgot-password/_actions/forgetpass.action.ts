"use server";

import { forgetPassValues } from "@/lib/schemas/auth.schema";

export default async function ForgetpassAction(data: forgetPassValues) {
  try {
    const response = await fetch(`${process.env.API}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    if (!payload.status) {
      throw {
        message: payload.message,
        errors: payload.errors || [],
      };
    }

    return {
      message: payload.message,
    };
  } catch (error: any) {
    throw new Error(
      error.message ||
        "Network error. Please check your connection and try again.",
    );
  }
}
