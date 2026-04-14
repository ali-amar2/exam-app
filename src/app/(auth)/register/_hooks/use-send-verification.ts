"use client";

import { useMutation } from "@tanstack/react-query";
import { sendEmailVerification } from "../_actions/email-verification.action";

export default function useSendVerification() {
  return useMutation({
    mutationFn: (email: string) => sendEmailVerification(email),
  });
}
