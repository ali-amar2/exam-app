"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmEmailVerification } from "../_actions/confirm-email-verification.action";
import { getErrorMessage } from "@/lib/utils/error";

export default function useConfirmVerification() {
  return useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      try {
        return await confirmEmailVerification(email, code);
      } catch (err: any) {
        throw new Error(getErrorMessage(err));
      }
    },
  });
}
