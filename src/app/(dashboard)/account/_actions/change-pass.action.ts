"use server";

import { getToken } from "@/lib/utils/get-token";

export async function changePasswordAction(values: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    const token = await getToken();

    const res = await fetch(`${process.env.API}/users/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accesstoken}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to change password",
      };
    }

    return {
      success: true,
      message: data.message || "Password changed successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
