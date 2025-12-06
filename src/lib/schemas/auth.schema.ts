import z from 'zod';

export const registerSchema = z.object({
    firstName: z.string().nonempty("First name is required").min(2, "First name must be at least 2 characters"),
    lastName: z.string().nonempty("Last name is required").min(2, "Last name must be at least 2 characters"),
    username: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address").nonempty("Email is required"),
    phone: z.string().nonempty("Phone number is required").transform((val) => {
        let phone = val.replace(/^(\+20)/, "");
        if (!phone.startsWith("0")) {
            phone = "0" + phone;
        }
        return phone;
    }).refine((val) => /^01[0125][0-9]{8}$/.test(val), { message: "Invalid phone number", }),
    password: z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"),
    rePassword: z.string().nonempty("Please confirm your password"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
});
export const loginSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});

export type loginValues = z.infer<typeof loginSchema>;
export type registerValues = z.infer<typeof registerSchema>;