"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  changePasswordSchema,
  changePasswordValues,
} from "@/lib/schemas/account.schema";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import ErrorBox from "@/components/ui/error-box";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useChangePassword } from "../../_hooks/use-change-pass";

export default function ChangePasswordForm() {
  // Hooks
  const { mutate, isPending, error } = useChangePassword();
  const { toast } = useToast();

  // Form initializing
  const form = useForm<changePasswordValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  // Submit Handler
  const onsubmit = (values: changePasswordValues) => {
    mutate(values, {
      onSuccess: async () => {
        toast({
          title: "Your Password Changed successfully , please Login again",
          duration: 1500,
        });
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 1500);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Box */}
        {error && <ErrorBox message={error.message} />}

        {/* Submit Btn */}
        <Button
          disabled={isPending}
          type="submit"
          className="my-4 w-11/12 mx-auto"
        >
          {isPending ? (
            <Loader className="animate-spin mr-2" size={16} />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
