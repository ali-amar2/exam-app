export const dynamic = "force-dynamic";

import AccountForm from "./_components/account-form";
import { getUserProfile } from "@/lib/services/user-profile.service";

export default async function AccountPage() {
  const user = await getUserProfile();
  if (!user) return null;

  return (
    <div className="flex h-full">
      <AccountForm initialUser={user} />
    </div>
  );
}
