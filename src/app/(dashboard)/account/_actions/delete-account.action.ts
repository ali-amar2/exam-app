"use server";

import { DeleteAccountResponse } from "@/lib/types/user";
import { getToken } from "@/lib/utils/get-token";

export async function deleteAccountAction() {
  try {
    const token = await getToken();

    const res = await fetch(`${process.env.API}/users/account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token?.accesstoken}`,
      },
    });

    const data: DeleteAccountResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to delete account",
      };
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
