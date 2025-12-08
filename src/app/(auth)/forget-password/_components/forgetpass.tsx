"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgetPassSchema, forgetPassValues } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import useForgetpass from '../hooks/use-forgetpass'
import ErrorBox from '@/components/ui/error-box'

export default function ForgetPassword({ onSuccess }: { onSuccess: (email: string) => void }) {

    const { mutate, isPending, data } = useForgetpass();

    const form = useForm<forgetPassValues>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(forgetPassSchema),
    })

    const onsubmit: SubmitHandler<forgetPassValues> = async (values) => {
        mutate(values, {
            onSuccess: (response) => {
                if (response.success) {
                    onSuccess(values.email)
                }
            }
        })

    }

    return <>
        <div className='flex flex-col gap-7'>
            <div className='flex flex-col gap-2 w-3/4'>
                <h1 className='font-inter font-bold text-3xl'>Forgot Password</h1>
                <p className='text-gray-500'>Don’t worry, we will help you recover your account.</p>
            </div>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className='flex flex-col gap-8' >
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
                    {data?.success === false && <ErrorBox message={data.message} />}

                    <Button type='submit' disabled={isPending}>Continue <ArrowRight /></Button>
                    <div className='flex flex-row gap-2 justify-center'>
                        <p>Don’t have an account? </p>
                        <Link href={"/register"} className='text-blue-600 font-medium'>Create yours</Link>
                    </div>
                </form>
            </Form>

        </div>

    </>
}
