"use client"
import { useState } from "react";
import ForgetPass from "./_components/forgetpass";
import ReceiveOtp from "./_components/receive-otp";
import SetNewPass from "./_components/set-new-pass";

export default function page() {

    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [email, setEmail] = useState("");

    return <>
        <main className='flex justify-center items-center'>
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
        </main >
    </>
}
