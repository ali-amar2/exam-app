"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPassSchema, forgetPassValues } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useForgetpass from "../hooks/use-forgetpass";
import ErrorBox from "@/components/ui/error-box";

export default function ForgetPassword({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  const { mutate, isPending, data } = useForgetpass();

  // Initialize react-hook-form with default values and Zod validation
  const form = useForm<forgetPassValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPassSchema),
  });

  // Submit handler
  const onsubmit: SubmitHandler<forgetPassValues> = async (values) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.success) {
          onSuccess(values.email);
        }
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-7">
        {/* Title and description */}
        <div className="flex flex-col gap-2 w-3/4">
          <h1 className="font-inter font-bold text-2xl">Forgot Password</h1>
          <p className="text-gray-500">
            Don’t worry, we will help you recover your account.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex flex-col gap-8"
          >
            {/* Email input field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="user@example.com"
                      error={!!form.formState.errors.email}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Display error message if API returns failure */}
            {data?.success === false && <ErrorBox message={data.message} />}

            {/* Submit button */}
            <Button type="submit" disabled={isPending}>
              Continue <ArrowRight />
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
