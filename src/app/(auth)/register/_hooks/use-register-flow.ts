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

      try {
        setEmail(values.email);
        setFormData(values);
        await sendVerification(values.email);
        setStep("otp");
      } catch (err: any) {
        setError(err.message);
      }
    },
    [sendVerification, resetError],
  );

  const handleVerifyOtp = useCallback(
    async (code: string) => {
      if (!formData || !email) return;

      resetError();

      try {
        await confirmVerification({ email, code });
        await register(formData);

        toast({
          description: "Your account has been created successfully",
        });

        router.replace("/login");
      } catch (err: any) {
        setError(err.message);
      }
    },
    [confirmVerification, register, formData, email, router, toast, resetError],
  );

  // resend
  const handleResendOtp = useCallback(async () => {
    if (!email) return;

    resetError();

    try {
      await sendVerification(email);
    } catch (err: any) {
      setError(err.message);
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
