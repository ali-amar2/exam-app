"use server";

import { resetPasswordValues } from "@/lib/schemas/auth.schema";

type ResetPasswordInput = resetPasswordValues & { token: string };

export default async function ResetPasswordAction(data: ResetPasswordInput) {
  try {
    const res = await fetch(`${process.env.API}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await res.json();

    if (!res.ok) throw new Error(payload.message || "Failed to reset password");

    return payload;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
}
