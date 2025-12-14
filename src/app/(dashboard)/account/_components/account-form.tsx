"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { accountSchema, accountValues } from "@/lib/schemas/account.schema";
import DeleteAccountDialog from "./alert-dialog";
import { useEditProfile } from "../_hooks/use-edit-profile";
import ErrorBox from "@/components/ui/error-box";
import { useSession } from "next-auth/react";

export default function AccountForm({ user }: { user: AccountUser }) {

    const { mutate: editProfile, isPending, isError, error, } = useEditProfile();
    const { update } = useSession();

    const EditPhoneInput = (phone: string) =>
        phone.startsWith("0") ? "+20" + phone.slice(1) : phone;

    const form = useForm<accountValues>({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone ? EditPhoneInput(user.phone) : "",
        },
        resolver: zodResolver(accountSchema),
    });
    const onSubmit: SubmitHandler<accountValues> = (values) => {
        editProfile(values, {
            onSuccess: async (data) => {
                form.reset({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    username: data.user.username,
                    email: data.user.email,
                    phone: EditPhoneInput(data.user.phone),
                });

                await update({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    username: data.user.username,
                    email: data.user.email,
                    phone: data.user.phone,
                });
            },
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 w-full bg-white p-3 h-full text-gray-800"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
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
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
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
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    autoComplete="new-username"
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(value) => field.onChange(value ?? "")}
                                    defaultCountry="EG"
                                    international
                                    countryCallingCodeEditable={false}
                                    className={form.formState.errors.phone ? "border-red-600 focus-visible:ring-red-600" : ""}
                                    placeholder="Enter phone number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                {isError && <ErrorBox message={error.message} />}

                <div className="flex w-full gap-4 mt-4">
                    <DeleteAccountDialog />

                    <Button type="submit" className="flex-1" disabled={isPending}>
                        {form.formState.isSubmitting ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "Save Changes"
                        )}

                    </Button>
                </div>

            </form>
        </Form>
    );
}
