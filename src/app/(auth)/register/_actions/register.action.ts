"use server";

import { registerValues } from "@/lib/schemas/auth.schema";

export async function registerAction(data: registerValues) {
  const response = await fetch(`${process.env.API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    return {
      success: false,
      message: payload?.message || "Registration failed",
    };
  }

  return {
    success: true,
    data: payload,
  };
}
