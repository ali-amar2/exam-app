import { useMutation } from "@tanstack/react-query";
import ForgetpassAction from "../_actions/forgetpass.action";
import { forgetPassValues } from "@/lib/schemas/auth.schema";

export default function useForgetpass() {
    return useMutation({
        mutationFn: async (values: forgetPassValues) => {
            const res = await ForgetpassAction(values)
            return res
        }
    })

}