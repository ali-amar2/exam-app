"use client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface PasswordSentProps {
  email: string;
  onBack?: () => void;
}

export default function PasswordSent({ email, onBack }: PasswordSentProps) {
  return (
    <div>
      {/* Back arrow */}
      {onBack && (
        <div
          className="border border-gray-400 w-fit p-1 mb-3 cursor-pointer"
          onClick={onBack}
        >
          <MoveLeft />
        </div>
      )}
      <div className="flex flex-col gap-7 w-full justify-center items-center">
        {/* Title and description */}
        <div className="flex flex-col gap-2 w-full">
          <h1 className="font-inter font-bold text-2xl mb-3">
            Password Reset Sent
          </h1>

          <div className="flex flex-col gap-5">
            <p>
              We have sent a password reset link to:
              <span className="block text-blue-600 font-medium">{email}</span>
            </p>
            <p>
              Please check your inbox and follow the instructions to reset your
              password.
            </p>

            <p className="text-zinc-500">
              If you don’t see the email within a few minutes, check your spam
              or junk folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
