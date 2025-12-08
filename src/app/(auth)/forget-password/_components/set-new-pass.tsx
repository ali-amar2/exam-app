"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { newPasswordSchema, newPasswordValues, } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ErrorBox from "@/components/ui/error-box";
import { zodResolver } from "@hookform/resolvers/zod";
import useSetPassword from "../hooks/use-set-newpass";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"

export default function SetNewPass({ email }: { email: string; }) {

    const { mutate, isPending, data } = useSetPassword();
    const { toast } = useToast();
    const router = useRouter()

    const form = useForm<newPasswordValues>({
        defaultValues: {
            newPassword: "",
            rePassword: "",
            email: email
        },
        resolver: zodResolver(newPasswordSchema),
    });

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
            }
        });
    };

    return (
        <div className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-2 ">
                <h1 className="font-inter font-bold text-3xl">Create a New Password</h1>
                <p className="text-gray-500">Create a new strong password for your account.</p>
            </div>
            <Form {...form}>
                <form className="flex flex-col gap-7" onSubmit={form.handleSubmit(onsubmit)}>
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} autoComplete="new-password" placeholder="********" error={!!form.formState.errors.newPassword} />
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
                    {data?.success === false && <ErrorBox message={data.message} />}
                    <Button type='submit' disabled={isPending}>Reset Password</Button>
                    <div className='flex flex-row gap-2 justify-center'>
                        <p>Don’t have an account? </p>
                        <Link href={"/register"} className='text-blue-600 font-medium'>Create yours</Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}
