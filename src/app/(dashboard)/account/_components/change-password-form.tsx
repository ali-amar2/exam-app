"use client";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Loader } from "lucide-react";
import ErrorBox from "@/components/ui/error-box";
import { changePasswordSchema, changePasswordValues } from "@/lib/schemas/account.schema";
import { useChangePassword } from "@/hooks/use-change-password";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function ChangePasswordForm() {

    const { toast } = useToast();

    const form = useForm<changePasswordValues>({
        defaultValues: {
            password: "",
            rePassword: "",
            oldPassword: "",
        },
        resolver: zodResolver(changePasswordSchema),
    });

    const { isPending, isError, error, mutate } = useChangePassword();

    const onsubmit: SubmitHandler<changePasswordValues> = (values) => {
        mutate(values, {
            onSuccess: () => {
                toast({
                    title: "Your Password Changed successfully , please Login again",
                    duration: 1500,
                });
                setTimeout(() => {
                    signOut({ callbackUrl: "/login" });
                }, 1500);
            }
        });

    };

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4 w-full " onSubmit={form.handleSubmit(onsubmit)}>
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} placeholder="********" error={!!form.formState.errors.oldPassword} />
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
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} placeholder="********" error={!!form.formState.errors.password} />
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
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} placeholder="********" error={!!form.formState.errors.rePassword} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isError && <ErrorBox message={(error as Error).message} />}

                <Button disabled={isPending} type="submit" className="my-4 w-11/12 mx-auto">  {isPending ? (<Loader className="animate-spin mr-2" size={16} />) : (
                    "Update Password"
                )}</Button>
            </form>
        </Form>
    );
}
