import z from "zod";

export const accountSchema = z.object({
    firstName: z.string().nonempty("First name is required").min(2, "First name must be at least 2 characters"),
    lastName: z.string().nonempty("Last name is required").min(2, "Last name must be at least 2 characters"),
    username: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    phone: z.string().nonempty("Phone number is required").transform((val) => { let phone = val.replace(/^(\+20)/, ""); if (!phone.startsWith("0")) { phone = "0" + phone; } return phone; }).refine((val) => /^01[0125][0-9]{8}$/.test(val), {
        message: "Invalid phone number",
    }),
});


export const changePasswordSchema = z
    .object({
        oldPassword: z.string().nonempty("Old password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"),
        password: z.string().nonempty("New password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"),
        rePassword: z.string().nonempty("Please confirm your new password"),
    })
    .superRefine((data, ctx) => {
        if (data.oldPassword === data.password) {
            ctx.addIssue({
                path: ["password"],
                message: "New password must be different from old password",
                code: z.ZodIssueCode.custom,
            });
        }
        if (data.password !== data.rePassword) {
            ctx.addIssue({
                path: ["rePassword"],
                message: "Passwords do not match",
                code: z.ZodIssueCode.custom,
            });
        }
    });

export type changePasswordValues = z.infer<typeof changePasswordSchema>;
export type accountValues = z.infer<typeof accountSchema>
