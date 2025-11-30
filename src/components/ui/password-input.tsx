"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export interface PasswordInputProps
    extends React.ComponentProps<"input"> { }

export function PasswordInput({ className, ...props }: PasswordInputProps) {
    const [show, setShow] = useState(false)

    return (
        <div className="relative w-full">
            <Input
                type={show ? "text" : "password"}
                className={className + " pr-12"}
                {...props}
            />

            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            >
                {show ? <EyeOff className="text-gray-500" size={16} /> : <Eye className="text-gray-500" size={16} />}
            </button>
        </div>
    )
}
