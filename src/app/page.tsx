import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp"
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Home() {

  return <>
    <h1>home</h1>
  </>
}

//  <div>
//     <InputOTP maxLength={6}>
//       <InputOTPGroup>
//         <InputOTPSlot index={0} />
//         <InputOTPSlot index={1} />
//         <InputOTPSlot index={2} />
//       </InputOTPGroup>
//       <InputOTPGroup>
//         <InputOTPSlot index={3} />
//         <InputOTPSlot index={4} />
//         <InputOTPSlot index={5} />
//       </InputOTPGroup>
//     </InputOTP>
//   </div>

