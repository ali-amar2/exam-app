"use server";

export async function sendEmailVerification(email: string) {
  const res = await fetch(`${process.env.API}/auth/send-email-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok || data?.status === false) {
    return {
      success: false,
      message: data?.message || "Unable to send verification code",
    };
  }

  return {
    success: true,
    message: data.message,
  };
}
