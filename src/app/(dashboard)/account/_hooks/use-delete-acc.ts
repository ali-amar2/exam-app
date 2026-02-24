import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyAccount } from "@/lib/services/delete-acc.service";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: async () => {
      queryClient.clear();
      await signOut({ redirect: false });
      router.replace("/login");
    },
  });
}
