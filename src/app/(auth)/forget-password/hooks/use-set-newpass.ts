import { useMutation } from "@tanstack/react-query";
import { newPasswordValues } from "@/lib/schemas/auth.schema";
import SetNewPassAction from "../_actions/set-new-pass.action";

export default function useSetPassword() {
  return useMutation({
    mutationFn: async (values: newPasswordValues) => {
      const res = await SetNewPassAction(values);
      return res;
    },
  });
}
