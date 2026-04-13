"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { Loader } from "lucide-react";
import ErrorBox from "@/components/ui/error-box";
import DeleteAccountDialog from "./alert-dialog";
import { accountSchema, accountValues } from "@/lib/schemas/account.schema";
import { AccountUser } from "@/lib/types/user";
import { useUpdateProfile } from "../_hooks/use-update-profile";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { normalizePhone } from "@/lib/utils/phone";

export default function AccountForm({
  initialUser,
}: {
  initialUser: AccountUser;
}) {
  // Hooks
  const { updateProfile, isPending, error } = useUpdateProfile();
  const { toast } = useToast();

  // Navigations
  const router = useRouter();

  // Form  initialization
  const form = useForm<accountValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!initialUser) return;

    form.reset({
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      username: initialUser.username,
      email: initialUser.email,
      phone: normalizePhone(initialUser.phone),
    });
  }, [initialUser, form]);

  // submit handler
  const onSubmit = (values: accountValues) => {
    updateProfile(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated successfully",
          });
          router.refresh();
          form.reset(values);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* First Name  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name  */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Username  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Email  */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  value={field.value || ""}
                  onChange={(v) => field.onChange(v ?? "")}
                  defaultCountry="EG"
                  international={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Backend Error message if isError*/}
        {error && (
          <ErrorBox
            message={error instanceof Error ? error.message : String(error)}
          />
        )}

        {/* delete & Save changes buttons */}
        <div className="flex gap-4">
          <DeleteAccountDialog />
          <Button
            type="submit"
            disabled={isPending || !form.formState.isDirty}
            className="flex-1"
          >
            {isPending ? (
              <Loader className="animate-spin w-4 h-4" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
