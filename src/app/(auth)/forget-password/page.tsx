"use client";
import { useState } from "react";
import ForgetPass from "./_components/forgetpass";
import ReceiveOtp from "./_components/receive-otp";
import SetNewPass from "./_components/set-new-pass";
import Link from "next/link";

export default function page() {
  // states
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");

  return (
    <>
      <main className="flex flex-col gap-5 justify-center w-full items-center px-8 min-h-screen">
        {step === "email" && (
          <ForgetPass
            onSuccess={(emailValue) => {
              setEmail(emailValue);
              setStep("otp");
            }}
          />
        )}
        {step === "otp" && (
          <ReceiveOtp
            email={email}
            onSuccess={() => setStep("reset")}
            onBack={() => setStep("email")}
          />
        )}
        {step === "reset" && <SetNewPass email={email} />}

        <div className="flex flex-row gap-2 justify-center flex-wrap">
          <p className="text-center">Don’t have an account? </p>
          <Link href={"/register"} className="text-blue-600 font-medium">
            Create yours
          </Link>
        </div>
      </main>
    </>
  );
}
