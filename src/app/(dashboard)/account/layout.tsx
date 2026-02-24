import AccountSidebar from "./_components/account-sidebar";
import { User } from "lucide-react";
import Title from "../_components/title";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-gray-50">
      <Title
        title="Account Settings"
        icon={<User className="h-full w-full" />}
      />

      <div className="flex flex-col lg:flex-row mt-4 gap-5 flex-1">
        <AccountSidebar />
        <main className="flex-1 bg-white p-3 text-gray-800">{children}</main>
      </div>
    </div>
  );
}
