import React from 'react'
import RegisterForm from './_components/register-form'
import Link from 'next/link'

export default function page() {
    return <>
        <main className='py-[5rem] px-[8.1875rem]'>
            <div>
                <h1 className='font-inter font-bold text-3xl mb-8   '>Create Account</h1>
                <RegisterForm />
                <div className='flex gap-2 mt-2 justify-center'>
                    <p>Already have an account? </p>
                    <Link href={"/login"} className='text-blue-600 font-medium'>Login</Link>
                </div>
            </div>
        </main >


    </>
}
