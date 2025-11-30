import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";

export default function RegisterForm() {
    return <>
        <form className="flex flex-col gap-4 w-full" autoFocus={false}  >
            <div className="flex gap-4">

                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input type="firstName" id="firstName" placeholder="Ali" />
                </div>

                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input type="lastName" id="lastName" placeholder="Ammar" />
                </div>
            </div>
            <div className="grid items-center gap-2">
                <Label htmlFor="username">Username</Label>
                <Input type="username" id="username" placeholder="ali123" />
            </div>
            <div className="grid items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="user@example.com" />
            </div>
            <div className="grid items-center gap-2">
                <Label htmlFor="phone">phone</Label>
                <PhoneInput
                    id="phone"
                    defaultCountry="EG"
                    international
                    countryCallingCodeEditable={false}
                    placeholder="Enter phone number"
                />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" placeholder="********" />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="rePassword">Confirm Password</Label>
                <PasswordInput id="rePassword" placeholder="********" />
            </div>
            <Button className="my-4">Create Account</Button>
        </form>


    </>
}
