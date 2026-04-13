import { useMutation } from "@tanstack/react-query";
import { resetPasswordValues } from "@/lib/schemas/auth.schema";
import ResetPasswordAction from "../_actions/reset-password";

type ResetPasswordInput = resetPasswordValues & { token: string };

export default function useResetPassword() {
  return useMutation({
    mutationFn: async (values: ResetPasswordInput) => {
      return await ResetPasswordAction(values);
    },
  });
}
