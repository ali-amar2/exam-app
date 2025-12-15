import { changePasswordValues } from "../schemas/account.schema";

export async function changePassword(payload: changePasswordValues) {
    const res = await fetch("/api/change-password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
    }

    return data;
}
