import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = cookies();

  const tokenCookie = cookieStore
    .getAll()
    .find(
      (cookie) =>
        cookie.name === "next-auth.session-token" ||
        cookie.name === "__Secure-next-auth.session-token",
    )?.value;

  if (!tokenCookie) return null;

  return decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });
}
