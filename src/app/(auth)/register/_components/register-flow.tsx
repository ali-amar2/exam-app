"use client";

import Link from "next/link";
import RegisterForm from "./register-form";
import OtpDialog from "./OtpDialog";
import useRegisterFlow from "../_hooks/use-register-flow";

export default function RegisterFlow() {
  // Hook
  const {
    step,
    email,
    error,
    isLoading,
    handleSubmitEmail,
    handleVerifyOtp,
    handleResendOtp,
    handleGoBack,
  } = useRegisterFlow();

  return (
    <main className="flex justify-center items-center w-full py-10 h-full">
      <div className="w-full flex justify-center items-center flex-col">
        {step === "form" && (
          <div className="w-full px-8 md:px-28 lg:px-14">
            <h1 className="font-bold text-3xl mb-5">Create Account</h1>

            <RegisterForm
              isPending={isLoading}
              error={error || undefined}
              onSubmit={handleSubmitEmail}
            />

            <div className="flex gap-2 justify-center">
              <p>Already have an account?</p>
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </div>
          </div>
        )}

        {step === "otp" && (
          <OtpDialog
            email={email}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            onBack={handleGoBack}
            isPending={isLoading}
            error={error || undefined}
          />
        )}
      </div>
    </main>
  );
}
