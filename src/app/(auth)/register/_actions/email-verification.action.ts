"use server";

export async function sendEmailVerification(email: string) {
  try {
    const res = await fetch(`${process.env.API}/auth/send-email-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Unable to send verification code. Please try again.",
      );
    }

    return {
      success: true,
      message: data.message || "Verification code sent successfully",
    };
  } catch (error: any) {
    throw new Error(
      error.message?.includes("Network")
        ? "Cannot connect to server. Please check your internet connection."
        : error.message || "Something went wrong. Please try again.",
    );
  }
}
