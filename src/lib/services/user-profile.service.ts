import { getToken } from "@/lib/utils/get-token";
import { AccountUser } from "../types/user";

export async function getUserProfile(): Promise<AccountUser | null> {
  const token = await getToken();

  if (!token?.accesstoken) return null;

  const res = await fetch(`${process.env.API}/users/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accesstoken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.payload.user ?? null;
}
