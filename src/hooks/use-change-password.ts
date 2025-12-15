import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/lib/services/change-password.service";

export function useChangePassword() {
    return useMutation({
        mutationFn: changePassword,
    });
}
