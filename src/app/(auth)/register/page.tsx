import React from "react";
import RegisterForm from "./_components/register-form";
import Link from "next/link";

export default function page() {
  return (
    <>
      <main className="flex justify-center w-full items-center py-10">
        <div className="w-full px-4 md:px-8 lg:px-14">
          <h1 className="font-inter font-bold text-3xl mb-8">Create Account</h1>
          <RegisterForm />
          <div className="flex gap-2 justify-center flex-wrap ">
            <p className="text-center">Already have an account? </p>
            <Link href={"/login"} className="text-blue-600 font-medium">
              Login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
