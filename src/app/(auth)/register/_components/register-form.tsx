"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { registerSchema, registerValues } from "@/lib/schemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import useRegister from "../_hooks/use-register";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import ErrorBox from "@/components/ui/error-box";

export default function RegisterForm() {
    const form = useForm<registerValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
        },
        resolver: zodResolver(registerSchema),
    });

    const { isPending, data, mutate } = useRegister();
    const router = useRouter();

    const onsubmit: SubmitHandler<registerValues> = (values) => {
        mutate(values, {
            onSuccess: (response) => {
                if (!("code" in response)) {
                    router.push("/login");
                }
            }
        });

    };

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4 w-full" onSubmit={form.handleSubmit(onsubmit)}>
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Ali" error={!!form.formState.errors.firstName} />
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
                                    <Input {...field} placeholder="Ammar" error={!!form.formState.errors.lastName} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} autoComplete="new-username" placeholder="ali123" error={!!form.formState.errors.username} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" placeholder="user@example.com" error={!!form.formState.errors.email} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} autoComplete="new-password" placeholder="********" error={!!form.formState.errors.password} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} placeholder="********" error={!!form.formState.errors.rePassword} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {data && "code" in data && (<ErrorBox message={data.message} />)}

                <Button disabled={isPending} type="submit" className="my-4">  {isPending ? (<Loader className="animate-spin mr-2" size={16} />) : (
                    "Create Account"
                )}</Button>
            </form>
        </Form>
    );
}
