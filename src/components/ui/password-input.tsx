"use client"
import React, { useState, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils/tailwind-merge"

export interface PasswordInputProps
    extends React.ComponentProps<"input"> {
    error?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, error, ...props }, ref) => {
        const [show, setShow] = useState(false)

        return (
            <div className="relative w-full">
                <Input
                    type={show ? "text" : "password"}
                    error={error}
                    className={cn(className, "pr-12")}
                    {...props}
                    ref={ref}
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                >
                    {show ? (
                        <EyeOff className="text-gray-500" size={16} />
                    ) : (
                        <Eye className="text-gray-500" size={16} />
                    )}
                </button>
            </div>
        )
    }
)

PasswordInput.displayName = "PasswordInput"
