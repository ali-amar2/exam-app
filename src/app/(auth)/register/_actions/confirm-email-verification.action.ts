"use server";

export async function confirmEmailVerification(email: string, code: string) {
  try {
    const res = await fetch(
      `${process.env.API}/auth/confirm-email-verification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.message || "Verification code is invalid or has expired.",
      );
    }

    return {
      success: true,
      message: data?.message || "Your email has been verified successfully.",
    };
  } catch (error: any) {
    const userMessage = error?.message?.includes("Network")
      ? "Cannot connect to server. Please check your internet connection."
      : error?.message || "Something went wrong. Please try again.";

    throw new Error(userMessage);
  }
}
