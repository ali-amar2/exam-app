"use client";

import {
  updateProfileAction,
  UpdateProfileInput,
} from "../_actions/update-profile.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: UpdateProfileInput) => {
      const res = await updateProfileAction(values);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.user;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  return {
    updateProfile: mutation.mutate,
    updateProfileAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
}
