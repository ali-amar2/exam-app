import { useQuery } from "@tanstack/react-query";

export function useUserData() {
    return useQuery<MeResponse>({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await fetch("/api/user-data", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch user profile");
            }

            return res.json();
        },
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: false,
    });
}

