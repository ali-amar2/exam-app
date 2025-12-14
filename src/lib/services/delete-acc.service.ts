export async function deleteMyAccount() {
    const res = await fetch("/api/delete-me", {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete account");
    }

    return res.json();
}
