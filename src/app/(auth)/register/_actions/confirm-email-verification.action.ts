"use server";

export async function confirmEmailVerification(email: string, code: string) {
  const res = await fetch(
    `${process.env.API}/auth/confirm-email-verification`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    },
  );

  const data = await res.json();

  if (!res.ok || data?.status === false) {
    return {
      success: false,
      message: data?.message || "Verification code is invalid or has expired.",
    };
  }

  return {
    success: true,
    message: data?.message,
  };
}
