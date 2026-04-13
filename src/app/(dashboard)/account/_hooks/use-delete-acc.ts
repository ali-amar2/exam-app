"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteAccountAction } from "../_actions/delete-account.action";

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async () => {
      const res = await deleteAccountAction();

      if (!res.success) {
        throw new Error(res.message);
      }

      return res;
    },
  });
}
