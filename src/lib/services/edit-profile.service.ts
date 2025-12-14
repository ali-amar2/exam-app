import { accountValues } from "../schemas/account.schema";
export async function editProfile(payload: accountValues) {
    const res = await fetch("/api/edit-profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
    }

    return data;

}
