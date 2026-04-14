"use client";

import { useMutation } from "@tanstack/react-query";
import { confirmEmailVerification } from "../_actions/confirm-email-verification.action";

export default function useConfirmVerification() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      confirmEmailVerification(email, code),
  });
}
