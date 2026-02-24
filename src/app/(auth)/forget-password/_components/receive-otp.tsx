"use client";
import { useEffect, useState } from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { ReceiveOtpSchema, ReceiveOtpValues } from "@/lib/schemas/auth.schema";
import { MoveLeft } from "lucide-react";
import ForgetpassAction from "../_actions/forgetpass.action";
import { Button } from "@/components/ui/button";
import useReceiveOtp from "../hooks/use-receive-opt";
import ErrorBox from "@/components/ui/error-box";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ReceiveOtp({
  email,
  onSuccess,
  onBack,
}: {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [counter, setCounter] = useState(60);
  const { mutate, isPending, data } = useReceiveOtp();

  // Load persisted OTP timer from localStorage on mount
  useEffect(() => {
    const savedExpire = localStorage.getItem("otpExpire");

    if (savedExpire) {
      const diff = Math.floor((Number(savedExpire) - Date.now()) / 1000);
      if (diff > 0) {
        setCounter(diff);
      } else {
        setCounter(0);
      }
    } else {
      const expireTime = Date.now() + 60 * 1000;
      localStorage.setItem("otpExpire", expireTime.toString());
    }
  }, []);

  // Countdown timer for OTP expiration
  useEffect(() => {
    if (counter === 0) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otpExpire");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  // Reset OTP timer
  const resetTimer = () => {
    const expireTime = Date.now() + 60 * 1000;
    localStorage.setItem("otpExpire", expireTime.toString());
    setCounter(60);
  };

  // Initialize react-hook-form with OTP input and validation
  const form = useForm<ReceiveOtpValues>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(ReceiveOtpSchema),
  });

  // Submit handler
  const onsubmit: SubmitHandler<ReceiveOtpValues> = async (values) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.success) {
          onSuccess();
        }
      },
    });
  };

  return (
    <div className="flex flex-col gap-8 w-3/4">
      {/* Header with back button */}
      <div className="flex flex-col gap-2 ">
        <div
          className="border border-gray-400 w-fit p-1 mb-10 cursor-pointer "
          onClick={onBack}
        >
          <MoveLeft />
        </div>
        <h1 className="font-inter font-bold text-3xl">Verify OTP</h1>
        <p className="text-gray-500">
          Please enter the 6-digits code we have sent to: {email}
          {/* Edit email link */}
          <span
            onClick={onBack}
            className="text-blue-600 font-medium cursor-pointer ml-3"
          >
            Edit
          </span>
        </p>
      </div>

      {/* OTP Input Form */}
      <Form {...form}>
        <form
          className="flex flex-col gap-7"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          {/* OTP input slots */}
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

          {/* OTP timer or resend option */}
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
                  ForgetpassAction({ email });
                  resetTimer();
                }}
              >
                Resend Code
              </button>
            </div>
          )}

          {/* Display API error */}
          {data?.success === false && <ErrorBox message={data.message} />}

          {/* Submit button */}
          <Button type="submit" disabled={isPending}>
            Verify Code
          </Button>
        </form>
      </Form>
    </div>
  );
}
