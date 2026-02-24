// app/account/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import AccountForm from "./_components/account-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account information and security settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-full">
      <AccountForm />
    </div>
  );
}
