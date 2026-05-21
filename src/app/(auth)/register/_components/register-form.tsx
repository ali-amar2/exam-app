"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { registerSchema, registerValues } from "@/lib/schemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import ErrorBox from "@/components/ui/error-box";

type RegisterFormProps = {
  onSubmit: (values: registerValues) => void;
  isPending?: boolean;
  error?: string;
};

export default function RegisterForm({
  onSubmit,
  isPending,
  error,
}: RegisterFormProps) {
  // form state
  const form = useForm<registerValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // submit handler
  const handleSubmit: SubmitHandler<registerValues> = (values) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-1 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
      >
        {/* First & Last Name */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="firstName">First name</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="Ali"
                    aria-invalid={!!form.formState.errors.firstName}
                    error={!!form.formState.errors.firstName}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="lastName">Last name</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    id="lastName"
                    autoComplete="family-name"
                    placeholder="Ammar"
                    aria-invalid={!!form.formState.errors.lastName}
                    error={!!form.formState.errors.lastName}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  id="username"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="ali123"
                  aria-invalid={!!form.formState.errors.username}
                  error={!!form.formState.errors.username}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="user@example.com"
                  aria-invalid={!!form.formState.errors.email}
                  error={!!form.formState.errors.email}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">Phone</FormLabel>

              <FormControl>
                <PhoneInput
                  {...field}
                  id="phone"
                  autoComplete="tel"
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value ?? "")}
                  defaultCountry="EG"
                  international
                  countryCallingCodeEditable={false}
                  className={
                    form.formState.errors.phone
                      ? "border-red-600 focus-visible:ring-red-600"
                      : ""
                  }
                  placeholder="Enter phone number"
                  aria-invalid={!!form.formState.errors.phone}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>

              <FormControl>
                <PasswordInput
                  {...field}
                  id="password"
                  autoComplete="new-password"
                  placeholder="********"
                  aria-invalid={!!form.formState.errors.password}
                  error={!!form.formState.errors.password}
                />
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
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>

              <FormControl>
                <PasswordInput
                  {...field}
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="********"
                  aria-invalid={!!form.formState.errors.confirmPassword}
                  error={!!form.formState.errors.confirmPassword}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Backend error message */}
        <div className="mt-2">{error && <ErrorBox message={error} />}</div>

        {/* Submit Button*/}
        <Button disabled={isPending} type="submit" className="my-4">
          {isPending ? (
            <Loader
              className="animate-spin mr-2"
              size={16}
              aria-hidden="true"
            />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
