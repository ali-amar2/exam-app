"use client";

import { useMemo, useState } from "react";
import ForgetPassword from "./forgot-pass";
import PasswordSent from "./PasswordSent";
import { useSearchParams } from "next/navigation";
import SetNewPass from "./set-new-pass";
import Link from "next/link";

export default function ForgotPasswordFlow() {
  // States
  const [step, setStep] = useState<"email" | "link">("email");
  const [email, setEmail] = useState("");

  // Search params
  const searchParams = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  return (
    <main className="flex flex-col gap-5 justify-center w-full items-center px-16 min-h-screen">
      {step === "email" && !token && (
        <ForgetPassword
          onSuccess={(emailValue: string) => {
            setEmail(emailValue);
            setStep("link");
          }}
        />
      )}

      {step === "link" && !token && (
        <PasswordSent email={email} onBack={() => setStep("email")} />
      )}

      {token && <SetNewPass token={token} />}

      {!token && (
        <div className="flex gap-2 justify-center flex-wrap mt-5">
          <p>Don’t have an account?</p>

          <Link
            href="/register"
            className="text-blue-600 font-medium underline-offset-4 hover:underline"
          >
            Create yours
          </Link>
        </div>
      )}
    </main>
  );
}
