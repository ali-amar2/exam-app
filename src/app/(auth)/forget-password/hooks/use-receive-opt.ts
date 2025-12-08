import { useMutation } from "@tanstack/react-query";
import receiveOtpAction from "../_actions/receive-otp.action";
import { ReceiveOtpValues } from "@/lib/schemas/auth.schema";

export default function useReceiveOtp() {
    return useMutation({
        mutationFn: async (values: ReceiveOtpValues) => {
            const res = await receiveOtpAction(values)
            return res
        }
    })
}