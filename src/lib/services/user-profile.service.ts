import { getToken } from "@/lib/utils/get-token";
import { AccountUser } from "../types/user";

export async function getUserProfile(): Promise<AccountUser | null> {
  const token = await getToken();

  const res = await fetch(`${process.env.API}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accesstoken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch profile");
    return null;
  }

  const data = await res.json();
  return data.payload.user;
}
