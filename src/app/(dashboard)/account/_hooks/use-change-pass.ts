import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../_actions/change-pass.action";

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
};

export function useChangePassword() {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordInput>({
    mutationFn: async (values) => {
      const res = await changePasswordAction(values);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res;
    },
  });
}
