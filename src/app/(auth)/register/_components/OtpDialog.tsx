"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReceiveOtpSchema, ReceiveOtpValues } from "@/lib/schemas/auth.schema";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBox from "@/components/ui/error-box";
import { zodResolver } from "@hookform/resolvers/zod";

type OtpDialogProps = {
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  isPending?: boolean;
  error?: string;
  onBack?: () => void;
};

export default function OtpDialog({
  email,
  onVerify,
  onResend,
  isPending,
  error,
  onBack,
}: OtpDialogProps) {
  // Form State with Zod
  const form = useForm<ReceiveOtpValues>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(ReceiveOtpSchema),
  });

  // Storage Key
  const storageKey = `otpExpire_${email}`;

  // States
  const [counter, setCounter] = useState(60);

  // Initialize timer from localStorage to persist countdown after refresh
  useEffect(() => {
    const savedExpire = localStorage.getItem(storageKey);
    if (savedExpire) {
      const diff = Math.floor((Number(savedExpire) - Date.now()) / 1000);
      setCounter(diff > 0 ? diff : 0);
    } else {
      const expireTime = Date.now() + 60 * 1000;
      localStorage.setItem(storageKey, expireTime.toString());
    }
  }, [storageKey]);

  useEffect(() => {
    if (counter === 0) return;
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(storageKey);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [counter, storageKey]);

  // Utils
  const resetTimer = () => {
    const expireTime = Date.now() + 60 * 1000;
    localStorage.setItem(storageKey, expireTime.toString());
    setCounter(60);
  };

  // Submit handler
  const onsubmit: SubmitHandler<ReceiveOtpValues> = (values) => {
    onVerify(values.resetCode);
  };

  return (
    <div className="flex flex-col gap-8 w-3/4">
      <div className="flex flex-col gap-2 ">
        {/* Arrow icon to back to the previous Step */}
        {onBack && (
          <div
            className="border border-gray-400 w-fit p-1 mb-3 cursor-pointer"
            onClick={onBack}
          >
            <MoveLeft />
          </div>
        )}
        <h1 className="font-inter font-bold text-3xl">Verify OTP</h1>
        <p className="text-gray-500">
          Please enter the 6-digits code we sent to:{" "}
          <span className="text-black">{email}</span>
          {onBack && (
            <span
              onClick={onBack}
              className="text-blue-600 font-medium cursor-pointer ml-3"
            >
              Edit
            </span>
          )}
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-7"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {counter > 0 ? (
            <p className="text-gray-500 flex justify-center">
              You can request another code in:{" "}
              <span className="font-semibold">{counter}s</span>
            </p>
          ) : (
            <div className="flex gap-2 justify-center">
              <p className="text-gray-500">Didn’t receive the code?</p>
              <button
                type="button"
                className="text-blue-600 font-medium"
                onClick={() => {
                  onResend();
                  resetTimer();
                }}
              >
                Resend Code
              </button>
            </div>
          )}

          {error && <ErrorBox message={error} />}

          <Button type="submit" disabled={isPending}>
            Verify Code
          </Button>
        </form>
      </Form>
    </div>
  );
}
