"use server";

import { getToken } from "@/lib/utils/get-token";

export type UpdateProfileInput = {
  firstName: string;
  lastName: string;
  phone: string;
};

export async function updateProfileAction(values: UpdateProfileInput) {
  try {
    const token = await getToken();

    const res = await fetch(`${process.env.API}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accesstoken}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok || data?.status === false) {
      return {
        success: false,
        message: data?.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      user: data.payload.user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
