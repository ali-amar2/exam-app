"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  resetPasswordValues,
} from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useResetPassword from "../hooks/use-reset-password";
import { useRouter } from "next/navigation";
import ErrorBox from "@/components/ui/error-box";

interface SetNewPassProps {
  token: string;
}

export default function SetNewPass({ token }: SetNewPassProps) {
  // Navigations
  const router = useRouter();

  // Hook & Toast
  const { mutate, error, isPending } = useResetPassword();
  const { toast } = useToast();

  // Initialize react-hook-form with zod
  const form = useForm<resetPasswordValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  // Submit Hanler
  const onSubmit: SubmitHandler<resetPasswordValues> = (values) => {
    mutate(
      { ...values, token },
      {
        onSuccess: () => {
          toast({ title: "Password updated successfully", duration: 3000 });
          router.replace("/login");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Create a New Password</h1>
        <p className="text-gray-500">
          Create a new strong password for your account.
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-7"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Password input  */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="********"
                    autoComplete="new-password"
                    error={!!form.formState.errors.newPassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password input  */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="********"
                    error={!!form.formState.errors.confirmPassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display API error */}
          {error && <ErrorBox message={error.message} />}

          {/* Reset password button */}
          <Button type="submit" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
