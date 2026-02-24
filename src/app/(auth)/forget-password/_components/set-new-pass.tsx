// SetNewPass component allows user to create a new password after OTP verification
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
  newPasswordSchema,
  newPasswordValues,
} from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import ErrorBox from "@/components/ui/error-box";
import { zodResolver } from "@hookform/resolvers/zod";
import useSetPassword from "../hooks/use-set-newpass";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SetNewPass({ email }: { email: string }) {
  // states
  const { mutate, isPending, data } = useSetPassword();
  const { toast } = useToast();
  // Navigation
  const router = useRouter();

  // Initialize react-hook-form with password fields and validation
  const form = useForm<newPasswordValues>({
    defaultValues: {
      newPassword: "",
      rePassword: "",
      email: email,
    },
    resolver: zodResolver(newPasswordSchema),
  });

  // Submit handler
  const onsubmit: SubmitHandler<newPasswordValues> = async (values) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.success) {
          toast({
            title: "Your Password updated successfully",
            duration: 3000,
          });
          setTimeout(() => {
            router.replace("/login");
          }, 1500);
        }
      },
    });
  };

  return (
    <div className="flex flex-col gap-8 ">
      {/* Title and description */}
      <div className="flex flex-col gap-2 ">
        <h1 className="font-inter font-bold text-3xl">Create a New Password</h1>
        <p className="text-gray-500">
          Create a new strong password for your account.
        </p>
      </div>

      {/* Password input form */}
      <Form {...form}>
        <form
          className="flex flex-col gap-7"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    autoComplete="new-password"
                    placeholder="********"
                    error={!!form.formState.errors.newPassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="********"
                    error={!!form.formState.errors.rePassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display API error */}
          {data?.success === false && <ErrorBox message={data.message} />}

          {/* Submit button */}
          <Button type="submit" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
