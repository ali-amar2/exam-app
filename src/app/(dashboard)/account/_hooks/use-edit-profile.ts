import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile } from "@/lib/services/edit-profile.service";

export function useEditProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
}