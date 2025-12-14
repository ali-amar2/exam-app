import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import AccountForm from "./_components/account-form";

export default async function AccountPage() {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    const user = {
        firstName: session.user.firstName ?? "",
        lastName: session.user.lastName ?? "",
        username: session.user.username ?? "",
        email: session.user.email ?? "",
        phone: session.user.phone ?? "",
    };
    console.log(session.user.firstName);

    return (
        <div className="flex h-full">
            <AccountForm user={user} />
        </div>
    );
}
