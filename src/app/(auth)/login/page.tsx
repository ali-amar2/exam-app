import Link from "next/link";
import LoginForm from "./_components/login-form";

export default function page() {
  return (
    <>
      <main className="flex justify-center w-full items-center min-h-screen">
        <div className="w-full px-8 md:px-28 lg:px-14">
          <h1 className="font-inter font-bold text-3xl mb-8">Login</h1>
          <LoginForm />
          <div className="flex gap-2 justify-center flex-wrap ">
            <p>Don’t have an account? </p>
            <Link href={"/register"} className="text-blue-600 font-medium">
              Create yours
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
