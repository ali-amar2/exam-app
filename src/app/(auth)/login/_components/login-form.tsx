"use client";
import { Button } from "@/components/ui/button";
import ErrorBox from "@/components/ui/error-box";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema, loginValues } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useLogin from "../_hooks/use-login";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  // Initialize react-hook-form with default values and Zod validation
  const form = useForm<loginValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // Navigation
  const router = useRouter();

  // hooks
  const { isPending, mutate: login, isError, error } = useLogin();

  // Submit handler
  const onsubmit: SubmitHandler<loginValues> = async (values) => {
    login(values, {
      onSuccess: () => {
        router.replace("/");
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="new-username"
                    placeholder="ali123"
                    error={!!form.formState.errors.username}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password input field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="********"
                    error={!!form.formState.errors.password}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot password link */}
          <div className="flex justify-end">
            <Link
              href={"/forgot-password"}
              className="text-blue-600 font-medium"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Display API error if login fails */}
          {isError && <ErrorBox message={error.message} />}

          {/* Submit button */}
          <Button disabled={isPending} type="submit" className="my-4">
            {isPending ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
