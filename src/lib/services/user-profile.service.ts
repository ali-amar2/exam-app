import { getToken } from "@/lib/utils/get-token";
import { AccountUser } from "../types/user";

export async function getUserProfile(): Promise<AccountUser> {
  const token = await getToken();

  const res = await fetch(`${process.env.API}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accesstoken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  const data = await res.json();
  return data.payload.user;
}
