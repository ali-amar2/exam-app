"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { accountSchema, accountValues } from "@/lib/schemas/account.schema";
import DeleteAccountDialog from "./alert-dialog";
import { useEditProfile } from "../_hooks/use-edit-profile";
import { useUserData } from "../_hooks/use-user-data";
import ErrorBox from "@/components/ui/error-box";
import { useToast } from "@/hooks/use-toast";

export default function AccountForm() {

    const { toast } = useToast();
    const { data: user, isLoading: isUserLoading, } = useUserData();
    const { mutate: editProfile, isPending, isError, error, } = useEditProfile();
    const EditPhoneInput = (phone: string) => phone.startsWith("0") ? "+20" + phone.slice(1) : phone;
    const form = useForm<accountValues>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phone: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                username: user.username ?? "",
                email: user.email ?? "",
                phone: user.phone ? EditPhoneInput(user.phone) : "",
            });
        }
    }, [user, form]);

    const onSubmit: SubmitHandler<accountValues> = (values) => {
        editProfile(values, {
            onSuccess: () => {
                toast({
                    title: "Profile updated successfully",
                    duration: 3000,
                });
            },
        });
    };

    if (isUserLoading) {
        return (
            <div className="flex items-center justify-center h-[300px]">
                <Loader className="animate-spin" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* First & Last Name */}
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(v) => field.onChange(v ?? "")}
                                    defaultCountry="EG"
                                    international
                                    countryCallingCodeEditable={false}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isError && <ErrorBox message={error.message} />}

                <div className="flex gap-4 mt-4">
                    <DeleteAccountDialog />

                    <Button type="submit" disabled={isPending} className="flex-1">
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
