"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { registerValues } from "@/lib/schemas/auth.schema";
import { useToast } from "@/hooks/use-toast";
import useSendVerification from "./use-send-verification";
import useConfirmVerification from "./use-confirm-verification";
import useRegister from "./use-register";

export default function useRegisterFlow() {
  // States
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState<registerValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  //  Navigations & Toast
  const router = useRouter();
  const { toast } = useToast();

  // Queries
  const { mutateAsync: register, isPending: isRegistering } = useRegister();
  const { mutateAsync: sendVerification, isPending: isSending } =
    useSendVerification();
  const { mutateAsync: confirmVerification, isPending: isConfirming } =
    useConfirmVerification();

  const resetError = useCallback(() => setError(null), []);

  // Handlers
  const handleSubmitEmail = useCallback(
    async (values: registerValues) => {
      resetError();

      setEmail(values.email);
      setFormData(values);

      const res = await sendVerification(values.email);

      if (!res?.success) {
        setError(res?.message || "Unable to send verification code");
        return;
      }

      setStep("otp");
    },
    [sendVerification, resetError],
  );

  const handleVerifyOtp = useCallback(
    async (code: string) => {
      if (!formData || !email) return;

      resetError();

      const verifyRes = await confirmVerification({ email, code });

      if (!verifyRes?.success) {
        setError(verifyRes?.message || "Invalid or expired code");
        return;
      }

      const registerRes = await register(formData);

      if (!registerRes?.success) {
        setError(registerRes?.message || "Registration failed");
        return;
      }

      toast({
        description: "Your account has been created successfully",
      });

      router.replace("/login");
    },
    [confirmVerification, register, formData, email, router, toast, resetError],
  );

  // resend
  const handleResendOtp = useCallback(async () => {
    if (!email) return;

    resetError();

    const res = await sendVerification(email);

    if (!res?.success) {
      setError(res?.message || "Unable to send verification code");
    }
  }, [email, sendVerification, resetError]);

  // back
  const handleGoBack = useCallback(() => {
    resetError();
    setStep("form");
  }, [resetError]);

  return {
    step,
    email,
    error,
    isLoading: isRegistering || isSending || isConfirming,
    handleSubmitEmail,
    handleVerifyOtp,
    handleResendOtp,
    handleGoBack,
  };
}
