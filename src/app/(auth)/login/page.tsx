import RegisterForm from './_components/login-form'
import Link from 'next/link'

export default function page() {
    return <>
        <main className='flex justify-center w-full items-center'>
            <div className='w-full px-32'>
                <h1 className='font-inter font-bold text-3xl mb-8'>Login</h1>
                <RegisterForm />
                <div className='flex gap-2 mt-2 justify-center'>
                    <p>Don’t have an account?  </p>
                    <Link href={"/register"} className='text-blue-600 font-medium'>Create yours</Link>
                </div>
            </div>
        </main >


    </>
}
