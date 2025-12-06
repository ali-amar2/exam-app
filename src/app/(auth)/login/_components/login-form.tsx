"use client"
import { Button } from "@/components/ui/button";
import ErrorBox from "@/components/ui/error-box";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema, loginValues } from "@/lib/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";
import useLogin from "../_hooks/use-login";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {

    const form = useForm<loginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    })

    const { isPending, mutate: login, isError, error } = useLogin();
    const router = useRouter();

    const onsubmit: SubmitHandler<loginValues> = async (values) => {
        login(values, {
            onSuccess: () => {
                router.replace("/");
            }
        })

    };

    return <>
        <Form {...form}>
            <form className="flex flex-col gap-4 w-full" onSubmit={form.handleSubmit(onsubmit)}>
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} placeholder="********" error={!!form.formState.errors.password} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end'>
                    <Link href={"/forget-password"} className='text-blue-600 font-medium'>Forgot your password?</Link>
                </div>

                {isError && <ErrorBox message={error.message} />}

                <Button disabled={isPending} type="submit" className="my-4">  {isPending ? (<Loader className="animate-spin mr-2" size={16} />) : (
                    "Login"
                )}</Button>
            </form>
        </Form>

    </>
}
