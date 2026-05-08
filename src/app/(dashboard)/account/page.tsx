import AccountForm from "./_components/account-form";
import { getUserProfile } from "@/lib/services/user-profile.service";

export default async function AccountPage() {
  const user = await getUserProfile();

  if (!user) {
    return (
      <div className="text-red-500 h-20 w-20 flex items-center justify-center">
        Session expired, please login again
      </div>
    );
  }
  return (
    <div className="flex h-full">
      <AccountForm initialUser={user} />
    </div>
  );
}
