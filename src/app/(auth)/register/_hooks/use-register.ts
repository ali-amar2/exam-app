"use client";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";
import { registerValues } from "@/lib/schemas/auth.schema";

export default function useRegister() {
  return useMutation({
    mutationFn: async (values: registerValues) => {
      const res = await registerAction(values);
      return res;
    },
  });
}
